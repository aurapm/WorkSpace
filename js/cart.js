const carrito_url = CART_INFO_URL + "25801" + EXT_TYPE;
const img = document.getElementById("imagen");
const product = document.getElementById("name");
const cost = document.getElementById("cost");
const cantidad = document.getElementById("cantidad");
const subtotal = document.getElementsByClassName("subtotal");
const tipoEnvio = document.querySelectorAll(".tipoEnvio input");
const costoEnvio = document.getElementById("costoEnvio");
const totalAPagar = document.getElementById("total");
const btnCerrar = document.getElementById("cerrar");
const btnCredito = document.getElementById("credito");
const btnTransferencia = document.getElementById("transferencia");
const numCuenta = document.getElementById("numCuenta");
const numDeTarjeta = document.getElementById("numDeTarjeta");
const codSeguridad = document.getElementById("codSeguridad");
const vencimiento = document.getElementById("vencimiento");
const formaSeleccionada = document.getElementById("formaSeleccionada");
const btnFinalizar = document.getElementById("finalizarCompra");
const invalidFeedBackPago = document.getElementById("invalidFeedBackPago");
let precioSubtotal = 0;
let precioEnvio = 0;
let precioTotal = 0;
let carritoInfo = [];


//Traer la informacion del producto y establecer las variables con el precio inicial que se va a mostrar.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(carrito_url).then(function(resultObj){
        if (resultObj.status === "ok"){
            carritoInfo = resultObj.data.articles
            precioSubtotal = carritoInfo[0].unitCost
            precioEnvio = 0.15 * precioSubtotal
            precioTotal = precioSubtotal + precioEnvio
            showCart()
        } 
    });
});    
//Esta funcion agrega al html la informacion traida con getJSONData
function showCart() {
    let {
        name, unitCost, currency, image
    } = carritoInfo[0]
    
    img.innerHTML = `<img src="${image}" >`;
    product.innerHTML = `${name}`;
    cost.innerHTML = `USD ${unitCost}`;
    subtotal[0].innerHTML = `USD ${unitCost}`;
    subtotal[1].innerHTML = `USD ${unitCost}`;
    costoEnvio.innerHTML = `USD ${precioEnvio}`;
    totalAPagar.innerHTML = `USD ${precioTotal}`;
};

//Este es el eventListener que modifica los precios al cambiar las cantidades (subtotal, precio del envio y total) y los agrega al html
cantidad.addEventListener('input', ()=> {
//establece el nuevo subtotal y lo agrega al html    
precioSubtotal = cantidad.value * carritoInfo[0].unitCost;

subtotal[0].innerHTML = `USD ${precioSubtotal}` 
subtotal[1].innerHTML = `USD ${precioSubtotal}`     
//modifica el precio del envio cuando cambia el subtotal y lo muestra en el html
tipoEnvio.forEach((element) => {    
        precioEnvio = parseInt(element.value) * precioSubtotal / 100;
        costoEnvio.innerHTML = `USD ${precioEnvio}`;           
    })
//modifica el precio total y lo muestra en el html    
precioTotal = precioSubtotal + precioEnvio;
totalAPagar.innerHTML = `USD ${precioTotal}`;
});

//Cuando cambia el tipo de envio modifica el precio de envio y el total 
tipoEnvio.forEach((element) => {    
    element.addEventListener('input', ()=> {
        precioEnvio = parseInt(element.value) * precioSubtotal / 100;
        costoEnvio.innerHTML = `USD ${precioEnvio}`;
        
        precioTotal = precioSubtotal + precioEnvio;
        totalAPagar.innerHTML = `USD ${precioTotal}`;
    })
});

//al apretar boton de pagar con credito desabilita el campo de pagar por transferencia y habilita los campos para llenar la informacion de la tarjeta de credito 
btnCredito.addEventListener('click', ()=>{
    numCuenta.disabled = true
    numDeTarjeta.disabled = false
    codSeguridad.disabled = false
    vencimiento.disabled = false  
});
//al apretar el boton transferencia habilita el campo numero de cuenta y desabilita los campos de credito
btnTransferencia.addEventListener('click', ()=>{
    numCuenta.disabled = false
    numDeTarjeta.disabled = true
    codSeguridad.disabled = true
    vencimiento.disabled = true  
});

//al apretar el boton de "cerrar" el modal se coloca en el html el tipo de pago seleccionado 
btnCerrar.addEventListener('click', () => {
    if (btnCredito.checked){
        formaSeleccionada.innerHTML = 'Tarjeta de Credito';
        invalidFeedBackPago.innerHTML= "";
    } 
    if (btnTransferencia.checked){
        formaSeleccionada.innerHTML = 'Transferencia Bancaria';
         invalidFeedBackPago.innerHTML= ""; 
    }
    if(!btnCredito.checked && !btnTransferencia.checked) {
        invalidFeedBackPago.innerHTML= `Debe ingresar una forma de pago`;
      }
});

//funcion que se ejecuta al enviar el formulario, muestra la alerta de exito en la compra si todos los campos se llenaron correctamente
function showSuccessAlert() {
        let successAlert = document.createElement('div')
        successAlert.innerHTML = `
            <div class="alert alert-success alert-dismissible" role="alert">
                Ha comprado con exito!
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">
            </button>
            </div>`
      
        document.getElementById("alertPlaceHolder").append(successAlert)
        
    };

    // Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms) 
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if(!btnCredito.checked && !btnTransferencia.checked) {
                invalidFeedBackPago.innerHTML= `Debe ingresar una forma de pago`;
          }  
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

