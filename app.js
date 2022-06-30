const getStartedButton = document.querySelector("#gsButt"); 
const input = document.querySelector("#symptoms");
const searchResults = document.querySelector("#searchResults");
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
    console.log(doc); 

    searchResults.classList.add("border"); 
    searchResults.classList.add("border-top-0"); 
    searchResults.classList.add("p-2"); 
    searchResults.classList.remove("d-none"); 
}); 


input.addEventListener("blur", () => {
    searchResults.classList.add("d-none");  
})

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

    for(symptom of searchResults) {
        let item = createSearchItem(symptom.Name); 
        resultItems.appendChild(item); 
    }
}

function createSearchItem(name) {

    let item = document.createElement("button"); 
    item.classList.add("list-group-item");
    item.classList.add("list-group-item-action") 
    item.innerText = name; 
    return item; 
}