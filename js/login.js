const btnIngresar = document.getElementById("ingresar");
const email = document.getElementById("email");

btnIngresar.addEventListener("click", function() {
    sesion()
})

function sesion() { 
    localStorage.setItem('email', email.value)
    location.href = "index.html"
}

