const url = PRODUCTS_URL + `${localStorage.getItem('catID')}` + EXT_TYPE;
const listOfProducts = document.getElementById("listOfProducts");
const titles = document.getElementById("titles");
const ORDER_ASC_BY_PRICE = "&gt$";
const ORDER_DESC_BY_PRICE = "&lt$";
const ORDER_BY_REL = "Rel.";
let currentProductsArray = []
let currentSortCriteria = undefined;
let minPrice = undefined;
let maxPrice = undefined;

//Funcion que ordena los productos(array) por un criterio (ascendente, descendente o relevancia)
function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE)
    {result = array.sort((a,b) => (a.cost < b.cost ? 1 : -1))}
    
    else if (criteria === ORDER_DESC_BY_PRICE)
        {result = array.sort((a,b) => (a.cost > b.cost ? 1 : -1))}
    
    else if (criteria === ORDER_BY_REL){
        result = array.sort(function(a, b) {
            let aRel = parseInt(a.soldCount);
            let bRel = parseInt(b.soldCount);

            if ( aRel > bRel ){ return -1; }
            if ( aRel < bRel ){ return 1; }
            return 0;
        });
    }
    return result;
}

//Funcion que guarda el id del producto que se seleccione
function setProductID(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info.html"
}

//Funcion que muestra los productos y los ordena en caso de que se defina un precio min y max.
function showDataProducts() {  
        let htmlContentToAppend = "";
        for(let i = 0; i < currentProductsArray.length; i++){
        let products = currentProductsArray[i];  
        
            if (((minPrice == undefined) || (minPrice != undefined && parseInt(`${products.cost}`) >= minPrice)) &&
                ((maxPrice == undefined) || (maxPrice != undefined && parseInt(`${products.cost}`) <= maxPrice))){
            
                htmlContentToAppend += `
                    <div onclick="setProductID(${products.id})" class="list-group-item list-group-item-action cursor-active">
                        <div class="row">
                            <div class="col-3">
                                <img src="${products.image}" class="img-thumbnail">
                            </div>
                            <div class="col">
                                <div class="d-flex w-100 justify-content-between">
                                    <h4 class="mb-1">${products.name} - ${products.currency} ${products.cost}</h4>
                                    <small class="text-muted">${products.soldCount} vendidos </small>
                                </div>
                                <p class="mb-1">${products.description}</p>
                            </div>
                        </div>
                    </div>`
            };
            document.getElementById("listOfProducts").innerHTML = htmlContentToAppend;   
        }   
};

//Funcion que recibe el criterio de ordenamiento y lo guarda en la variable currentSortCriteria para ser usado en la funcion "sortProducts()". 
function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;
//Si la lista de productos no es indefinida se guardan en la variable "currentProductsArray", que a su vez es ordenada por la funcion sortProducts()
    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

//finalmente la lista de productos ordenada por el criterio establecido se muestra en el html con showDataProducts()
    showDataProducts();
}

//cuando carga la pagina trae los datos .json de la url con la lista de productos.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(url).then(function(resultObj){
        if (resultObj.status === "ok"){
           currentProductsArray = resultObj.data.products           
           showDataProducts()
        }
        titles.innerHTML += `
            <h2>Productos</h2>
            <p class="lead">Verás aquí todos los productos de la categoría ${resultObj.data.catName}.</p>`
    });

    //se ejecuta la funcion sortAndShowProducts cada vez que se haga click en el boton de ordenar por precio o relevancia
    document.getElementById("sortAscPrice").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_PRICE);
    });

    document.getElementById("sortDescPrice").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_PRICE);
    });

    document.getElementById("sortByRel").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_REL);
    });

    //limpia el filtro que se haya elegido cuando se hace click en "limpiar"
    document.getElementById("clearRangeFilterPrice").addEventListener("click", function(){
        document.getElementById("rangeFilterPriceMin").value = "";
        document.getElementById("rangeFilterPriceMax").value = "";

        minPrice = undefined;
        maxPrice = undefined;

        showDataProducts();
    });

    //ordena los productos por el rango de precio establecido al hacer click en "filtrar"
    document.getElementById("rangeFilterPrice").addEventListener("click", function(){
        minPrice = document.getElementById("rangeFilterPriceMin").value;
        maxPrice = document.getElementById("rangeFilterPriceMax").value;

        if ((minPrice != undefined) && (minPrice != "") && (parseInt(minPrice)) >= 0){
            minPrice = parseInt(minPrice);
        }
        else{
            minPrice = undefined;
        }

        if ((maxPrice != undefined) && (maxPrice != "") && (parseInt(maxPrice)) >= 0){
            maxPrice = parseInt(maxPrice);
        }
        else{
            maxPrice = undefined;
        }

        showDataProducts();
    });
})

