const product_url = PRODUCT_INFO_URL + `${localStorage.getItem('prodID')}` + EXT_TYPE;
const comments_url = PRODUCT_INFO_COMMENTS_URL + `${localStorage.getItem('prodID')}` + EXT_TYPE;
const commentsSection = document.getElementById("commentsSection");
const stars = document.querySelectorAll(".stars span");
const btnEnviar = document.getElementById("send");
const newComment = document.getElementById("userComment");
let productInfo = [];

//Funcion que muestra la información del producto y la ordena en el html.
function showTheProductData() { 
       
    let {
        id, name, description, cost, currency, soldCount, category,
    } = productInfo
    

    document.getElementById("infoContainer").innerHTML+= ` 
        <div onclick="setCatID(${id})">
            <h4 class="mb-1 mt-3">${name}</h4>
            <hr>
            <p class="mb-1"><strong>Precio</strong></p>
            <p>${currency} ${cost}</p>
            <p class="mb-1"><strong>Descripcion</strong></p>
            <p>${description}</p>
            <p class="mb-1"><strong>Categoria</strong></p>
            <p>${category}</p>             
            <p class="mb-1"><strong>Cantidad de Vendidos</strong></p>
            <p>${soldCount}</p>
            <p class="mb-1"><strong>Imagenes Ilustrativas</strong></p>
        </div>`;

    showImage()
    relatedProducts()
};

//Función que muestra las imagenes del producto en un carrusel
function showImage() {
    let images = productInfo.images
   
    document.getElementById("img1").innerHTML+= `
    <img src="${images[0]}" class="d-block w-100">`
    
    for (let i = 1; i < images.length; i++){
        let imagesCarousel = images[i]
        document.getElementById("imgCarousel").innerHTML += `
            <div class="carousel-item">
            <img src="${imagesCarousel}" class="d-block w-100"
            </div>` 
    }
};

//Función que guarda el Id del producto en el local storage
function setProductID(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info.html"
}

//Función que muestra los productos relacionados en el html.
function relatedProducts(){
    let relatedProducts = productInfo.relatedProducts

    for(let i = 0; i < relatedProducts.length; i++) {
        let others = relatedProducts[i]

        const {id, name, image} = others
    
        document.getElementById("relatedProd").innerHTML+= `
        <div onclick="setProductID(${id})"  class="col-lg-3 md-2">
            <div class="card mb-4 shadow-sm custom-card cursor-active">
            <img src="${image}" alt="Imagen representativa de ${name}">
            <p><strong>${name}</strong></p> 
            </div>
        </div>
    `};
}; 

//Función que muestra los comentarios y los ordena en el html
function showComments() { 

    for(let i = 0; i < commentsInfo.length; i++) {
        let comments = commentsInfo[i]

        const {product, score, description, user, dateTime} = comments
        
        //por cada punto de score añade una estrella
        for(let i=0; i < score; i++){
            commentsSection.innerHTML+= `
            <span class="fa fa-star checked" id="star"></span>
            `
        }
        //muestra el comentario con su usuario y fecha
        commentsSection.innerHTML+= `
        <span>${user}</span> 
        <small class="text-muted">${dateTime}</small>
        <p>${description} </p>        
        `
    };  
};

//cuando carga la pagina trae la informacion del producto .json, la guarda en productInfo y ejecuta showTheProductData
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(product_url).then(function(resultObj){
        if (resultObj.status === "ok"){
           productInfo = resultObj.data   
           showTheProductData()
        } 
    });
    //tambien trae la información de los comentarios, la guarda en commentsInfo y ejecuta la funcion showComments.
    //tambien ejecuta showUsersComment y muestra el comentario realizado previamente 
    getJSONData(comments_url).then(function(resultObj){
        if (resultObj.status === "ok"){
           commentsInfo = resultObj.data   
           showComments()
           showUsersComment()
        } 
    })
});

//Recorre el span de estrellas en el html
stars.forEach((selectedStar, clickIdx) => {
    //cuando se haga click en una estrella va guardar en el local storage el comentario y la calificación dada    
    selectedStar.addEventListener("click", ()=> {
        localStorage.setItem("rating", clickIdx+1);
        //recorre el array de estrellas y si el indice de la estrella es menor al indice clickeado agrega el atributo "checked" al span de estrellas, en caso contrario remueve ese atributo.
        stars.forEach((star, idx) => {
            if (idx <= clickIdx) {
                star.classList.add("checked")    
            }
            else {
                star.classList.remove("checked")
            }
        })
    });
}); 

//funcion que trae el rating y comentario colocado por el usuario del localStorage y los muestra en la seccion de comentarios
function showUsersComment(){
  for(i=0; i< localStorage.getItem('rating'); i++){
      commentsSection.innerHTML +=`
      <span class="fa fa-star checked"></span>
      `
  }
  commentsSection.innerHTML +=`
  <span>${localStorage.getItem('email')}</span> 
  <p >${localStorage.getItem('Usercomment')}</p>
  `
}

//Funcion que previene el envio del formulario del comentario en caso de que este vacio. 
//en caso de estar bien se guarda el comentario en el local storage y se ejecuta la funcion showUsersComment
(function () {
    'use strict'
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms) 
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            } else {
                localStorage.setItem("Usercomment", newComment.value);
                showUsersComment()
                event.preventDefault()
            }         
        }, false)
      })
  })()
