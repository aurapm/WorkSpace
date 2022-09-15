const container = document.getElementById("container");
const titulo = document.getElementById("titulos");
const url = PRODUCTS_URL + `${localStorage.getItem('catID')}` + EXT_TYPE;
let currentProductsArray = []
const ORDER_ASC_BY_PRICE = "&gt$";
const ORDER_DESC_BY_PRICE = "&lt$";
const ORDER_BY_REL = "Rel.";
let currentSortCriteria = undefined;
let minPrice = undefined;
let maxPrice = undefined;

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
function showData() {  
        let htmlContentToAppend = "";
        for(let i = 0; i < currentProductsArray.length; i++){
        let products = currentProductsArray[i];  
        
            if (((minPrice == undefined) || (minPrice != undefined && parseInt(`${products.cost}`) >= minPrice)) &&
                ((maxPrice == undefined) || (maxPrice != undefined && parseInt(`${products.cost}`) <= maxPrice))){
                htmlContentToAppend += `
                <div class="list-group-item list-group-item-action cursor-active">
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
            document.getElementById("container").innerHTML = htmlContentToAppend;   
        }   
};

function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    showData();
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(url).then(function(resultObj){
        if (resultObj.status === "ok"){
           currentProductsArray = resultObj.data.products           
           showData()
        }
        titulo.innerHTML += `
            <h2>Productos</h2>
            <p class="lead">Verás aquí todos los productos de la categoría ${resultObj.data.catName}.</p>`
    });

    document.getElementById("sortAscPrice").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_PRICE);
    });

    document.getElementById("sortDescPrice").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_PRICE);
    });

    document.getElementById("sortByRel").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_REL);
    });

    document.getElementById("clearRangeFilterPrice").addEventListener("click", function(){
        document.getElementById("rangeFilterPriceMin").value = "";
        document.getElementById("rangeFilterPriceMax").value = "";

        minPrice = undefined;
        maxPrice = undefined;

        showData();
    });

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

        showData();
    });
})

