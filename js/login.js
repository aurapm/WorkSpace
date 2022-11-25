const btnLogIn = document.getElementById("btnLogIn");
const email = document.getElementById("email");

// trae el boton para ingresar, y ejecuta la funcion session() 
btnLogIn.addEventListener("click", function() {
    openSession()
})

//La función guarda el email en el local storage y redirige a index.html
function openSession() { 
    localStorage.setItem('email', email.value)
}

