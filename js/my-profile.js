const name1 = document.getElementById("name1");
const name2 = document.getElementById("name2");
const lastName1 = document.getElementById("lastName1");
const lastName2 = document.getElementById("lastName2");
const email = document.getElementById("email");
const telephone = document.getElementById("telephone");
const btnSaveChanges = document.getElementById("saveChanges");
const profileForm = document.getElementById("profileForm");
const profilePicture = document.getElementById("profilePicture");
const loadPicture = document.getElementById("loadPicture")
const predeterminatedImg = "img/img_perfil.png"
let imgUrl = ""

//Trae del local storage la informacion y la pone en los campos
document.addEventListener("DOMContentLoaded", ()=>{
    name1.value = localStorage.getItem('firstName');
    name2.value = localStorage.getItem('secondName');
    lastName1.value = localStorage.getItem('firstLastName');
    lastName2.value = localStorage.getItem('secondLastName');
    email.value = localStorage.getItem('email');
    telephone.value = localStorage.getItem('telephone');
    let recentImgDataUrl = localStorage.getItem('profileImg');
//si hay una imagen en el local storage la muestra, sino coloca una por defecto
    if (recentImgDataUrl){
        profilePicture.setAttribute("src", recentImgDataUrl)
    } else {
        profilePicture.setAttribute("src", predeterminatedImg)
    }
});

//al hacer click en "guardar cambios" tambien guarda en el local storage la informacion colocada, incluyendo la imagen
btnSaveChanges.addEventListener('click', ()=>{
    if(profileForm.checkValidity()){
        localStorage.setItem('firstName', name1.value)
        localStorage.setItem('secondName', name2.value)
        localStorage.setItem('firstLastName', lastName1.value)
        localStorage.setItem('secondLastName', lastName2.value)
        localStorage.setItem('telephone', telephone.value)
        localStorage.setItem('profileImg', imgUrl)
    }
})

//previzualiza la imagen cuando se carga y guarda su url en una variable "imgUrl"
loadPicture.addEventListener('change', ()=>{
    const reader = new FileReader();
    reader.readAsDataURL(loadPicture.files[0])
        reader.addEventListener('load', ()=>{
            profilePicture.setAttribute("src", reader.result)
            imgUrl = reader.result
        })
})

//Muestra una alerta de exito cuando los cambios se guardan correctamente
function showSuccessAlert() {
    let successAlert = document.createElement('div')
    successAlert.innerHTML = `
        <div class="alert alert-success alert-dismissible" role="alert">
            Se han guardado los cambios!
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">
        </button>
        </div>`
    document.getElementById("alertPlaceHolder").append(successAlert)
};
 
//Validacion del formulario con bootstrap
 // Example starter JavaScript for disabling form submissions if there are invalid fields
 (function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms) 
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) { //
                event.preventDefault()
                event.stopPropagation()
            } else {
            showSuccessAlert()
            event.preventDefault()
          }          
          form.classList.add('was-validated') //muestra todas las validaciones
        }, false)
      })
  })()
