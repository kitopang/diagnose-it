const secondPage = document.querySelector("#secondPage"); 
const getStartedButton = document.querySelector("#gsButt"); 
const input = document.querySelector("#symptoms");
const searchResultsContainer = document.querySelector("#searchResults");
const resultItems = document.querySelector("#resultItems"); 
const resultsPlaceholder = document.querySelector("#placeholder"); 
const addedSymptoms = document.querySelector("#addedSymptoms")
let doc; 

const getSymptoms = function() {
    fetch("./resources/symptoms6_29.json")
    .then(response => {
        return response.json();
     })
     .then(jsondata => doc = jsondata
     );
}

getStartedButton.addEventListener("click", getSymptoms); 

input.addEventListener("focus", () => {
    searchResultsContainer.classList.add("border"); 
    searchResultsContainer.classList.add("border-top-0"); 
    searchResultsContainer.classList.add("p-2"); 
    searchResultsContainer.classList.remove("d-none"); 
}); 


// input.addEventListener("blur", () => {
//     if(document.activeElement !== searchResultsContainer) {
//         searchResultsContainer.classList.add("d-none");
//     }
// })





input.addEventListener("input", () => {
    if(input.value === "") {
        resultItems.innerHTML = ""; 
        resultsPlaceholder.classList.remove("d-none"); 
    } else {
        resultsPlaceholder.classList.add("d-none"); 
        let searchResults = search(input.value); 
        displayResults(searchResults); 
    }
})

searchResultsContainer.addEventListener("click", function(e) { 
    console.log(e); 
    console.log("here"); 
})

function search(query) {
    let results = []; 

    for(symptom of doc) {
        if (results.length >= 10) {
            break; 
        }

        if(symptom.Name.toLowerCase().substring(0, query.length) === query) {
            results.push(symptom); 
        }
    }

    for(symptom of doc) {
        if (results.length >= 10) {
            break; 
        }

        if(symptom.Name.toLowerCase().includes(query) && !results.includes(symptom)) {
            results.push(symptom); 
        }
    }

    return results; 
}

function displayResults(searchResults) {
    resultItems.innerHTML = ""; 

    if(searchResults.length === 0) {
        let item = createSearchItem("No results"); 
        item.classList.add("disabled"); 
        resultItems.appendChild(item); 
    } else  {
        let num = 0; 

        for(symptom of searchResults) {
            let item = createSearchItem(symptom.Name); 
            item.setAttribute("id", "button" + num); 
            resultItems.appendChild(item); 
            num++; 
        }
    }
}

function createSearchItem(name) {
    let item = document.createElement("button"); 
    item.classList.add("list-group-item");
    item.classList.add("list-group-item-action"); 
    item.classList.add("border-0"); 
    item.innerText = name; 
    return item; 
}