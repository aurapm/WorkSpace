const container = document.getElementById("container");
let carsArray = []
const DATA_CARS = "https://japceibal.github.io/emercado-api/cats_products/101.json";

function showData(dataArray) {

    for(let i = 0; i < dataArray.products.length; i++){
        let carsArray = dataArray.products[i];
    
        container.innerHTML += 
        `
            <div class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${carsArray.image}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${carsArray.name} - ${carsArray.currency} ${carsArray.cost}</h4>
                            <small class="text-muted">${carsArray.soldCount} vendidos </small>
                        </div>
                        <p class="mb-1">${carsArray.description}</p>
                    </div>
                </div>
            </div>
            `
    }    
}   

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(DATA_CARS).then(function(resultObj){
        if (resultObj.status === "ok"){
           dataArray = resultObj.data
           showData(dataArray)
        }
    })
})





