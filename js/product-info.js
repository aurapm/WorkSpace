const product_url = PRODUCT_INFO_URL + `${localStorage.getItem('prodID')}` + EXT_TYPE;
const comments_url = PRODUCT_INFO_COMMENTS_URL + `${localStorage.getItem('prodID')}` + EXT_TYPE;
const commentsSection = document.getElementById("commentsSection")
const stars = document.querySelectorAll(".stars span");
const btnEnviar = document.getElementById("enviar");
const newComment = document.getElementById("comentar");

let productInfo = [];

function showData() { 
       
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
    </div>                
    `;

    showImage()
    relatedProducts()
};

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

function setProductID(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info.html"
}

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


function showComments() { 

    for(let i = 0; i < commentsInfo.length; i++) {
        let comments = commentsInfo[i]

        const {product, score, description, user, dateTime} = comments
         
        for(let i=0; i < score; i++){
            commentsSection.innerHTML+= `
            <span class="fa fa-star checked" id="star"></span>
            `
        }
        
        commentsSection.innerHTML+= `
        <span>${user}</span> 
        <small class="text-muted">${dateTime}</small>
        <p>${description} </p>        
        `
    };  
};

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(product_url).then(function(resultObj){
        if (resultObj.status === "ok"){
           productInfo = resultObj.data   
           showData()
        } 
    });

    getJSONData(comments_url).then(function(resultObj){
        if (resultObj.status === "ok"){
           commentsInfo = resultObj.data   
           showComments()
        } 
    })
});


stars.forEach((selectedStar, clickIdx) => {    
    selectedStar.addEventListener("click", ()=> {
        localStorage.setItem("rating", clickIdx+1);
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

function submitForm(){
        localStorage.setItem("comentario", newComment.value);
        
       for(i=0; i< localStorage.getItem('rating'); i++){
            commentsSection.innerHTML +=`
            <span class="fa fa-star checked" ></span>
            `
        }
        
        commentsSection.innerHTML +=`
        <span>${localStorage.getItem('email')}</span> 
        <p >${localStorage.getItem('comentario')}</p>
        `   
return (false);
};

btnEnviar.addEventListener("click", ()=>{
    submitForm()
});

