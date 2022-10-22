const carrito_url = CART_INFO_URL + "25801" + EXT_TYPE;
const prodPrecargado = document.getElementById("prodPrecargado");
const img = document.getElementById("imagen");
const product = document.getElementById("name");
const cost = document.getElementById("cost");
const cantidad = document.getElementById("cantidad");
const subtotal = document.getElementById("subtotal")
let cuentaSubtotal = 0;
let carritoInfo = [];

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(carrito_url).then(function(resultObj){
        if (resultObj.status === "ok"){
            carritoInfo = resultObj.data.articles
            showCarrito()
        } 
    });
});    

function showCarrito() {
        let {
            name, unitCost, currency, image
        } = carritoInfo[0]
        
        img.innerHTML = `<img src="${image}" >`
        product.innerHTML = `${name}`
        cost.innerHTML = `${currency} ${unitCost}`
        subtotal.innerHTML = `${currency} ${unitCost}`          
}


cantidad.addEventListener('input', ()=> {
    if(parseInt(cantidad.value) >= 0){
    cuentaSubtotal = cantidad.value * carritoInfo[0].unitCost
    subtotal.innerHTML = `${carritoInfo[0].currency} ${cuentaSubtotal}`  
} 
    else {parseInt(cantidad.value) < 0}
    subtotal.innerHTML = `${carritoInfo[0].currency} ${cuentaSubtotal}`

});

