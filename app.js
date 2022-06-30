const getStartedButton = document.querySelector("#gsButt"); 
const input = document.querySelector("#symptoms");
const searchResults = document.querySelector("#searchResults");
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
        resultsPlaceholder.classList.remove("d-none"); 
    } else {
        resultsPlaceholder.classList.add("d-none"); 
        let searchResults = search(input.value); 
        
        for(symptom of searchResults) {
            console.log("here"); 
            console.log(symptom); 
        }
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

        if(symptom.Name.toLowerCase().includes(query)) {
            results.push(symptom); 
        }
    }

    return results; 
}

function displaySamples() {
    createSearchItem()
}

function createSearchItem(name) {
    let item = document.createElement("button"); 
    item.classList.add("list-group-item list-group-item-action"); 
    return item; 
}