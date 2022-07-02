const secondPage = document.querySelector("#secondPage"); 
const getStartedButton = document.querySelector("#gsButt"); 
const input = document.querySelector("#symptoms");

const searchResultsContainer = document.querySelector("#searchResults");
const resultItems = document.querySelector("#resultItems"); 
const resultsPlaceholder = document.querySelector("#placeholder"); 

const addedSymptomsContainer = document.querySelector("#addedSymptomsContainer");
const addedSymptoms = document.querySelector("#addedSymptoms");
const submitButton = document.querySelector("#submitButt");

const inputContainer = document.querySelector("#inputContainer");


let doc; 
let mouseOver; 

const getSymptoms = function() {
    fetch("./resources/symptoms6_29.json")
    .then(response => {
        return response.json();
     })
     .then(jsondata => doc = jsondata
     );

     input.focus(); 
}

getStartedButton.addEventListener("click", getSymptoms); 

input.addEventListener("focus", () => {
    searchResultsContainer.classList.add("border"); 
    searchResultsContainer.classList.add("border-top-0"); 
    searchResultsContainer.classList.add("p-2"); 
    searchResultsContainer.classList.remove("d-none"); 
}); 


input.addEventListener("focusout", () => {
    console.log("mouse"); 
     if(!mouseOver) {
         searchResultsContainer.classList.add("d-none");
     } else {
        input.focus(); 
     }
 })

searchResultsContainer.addEventListener("mouseenter", () => {
    mouseOver = true; 
    console.log("on"); 
}); 

searchResultsContainer.addEventListener("mouseleave", () => {
    mouseOver = false;  
    console.log("off"); 
});


input.addEventListener("input", () => {
    if(input.value === "") {
        resultItems.innerHTML = ""; 
        resultsPlaceholder.classList.remove("d-none"); 
    } else {
        resultsPlaceholder.classList.add("d-none"); 
        let searchResults = search(input.value); 
        displayResults(searchResults); 
    }
});

searchResultsContainer.addEventListener("click", function(e) { 
    console.log(e.target.symptomObject)
    let currentSymptom = e.target.symptomObject; 
    console.log("hi" + currentSymptom); 
    let newItem = createAddedItem(currentSymptom.Name);
    newItem.symptomObject = currentSymptom; 
    addedSymptomsContainer.classList.remove("d-none"); 
    inputContainer.classList.remove("col-md-12"); 
    inputContainer.classList.add("col-md-6"); 
    addedSymptoms.appendChild(newItem); 
});

addedSymptoms.addEventListener("click", function(e) {
    e.target.remove(); 
    console.log(addedSymptoms.childElementCount); 

    if(addedSymptoms.childElementCount === 1) {
        addedSymptomsContainer.classList.add("d-none"); 
        inputContainer.classList.remove("col-md-6"); 
        inputContainer.classList.add("col-md-12");
        input.focus(); 
    }
}); 

submitButton.addEventListener("click", () => {
 ////WORK ON THIS TMRW
});

function search(query) {
    let results = []; 

    // Search for symptoms that start with the same letters. This has precedence.
    for(symptom of doc) {
        if (results.length >= 10) {
            break; 
        }

        if(symptom.Name.toLowerCase().substring(0, query.length) === query) {
            results.push(symptom); 
        }
    }

    // Search for symptoms that have the same combination of letters if search array isn't already full. 
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
            // Attach symptom object to button for later reference
            item.symptomObject = symptom; 
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

function createAddedItem(name) {
    let item = document.createElement("li"); 
    item.classList.add("list-group-item"); 
    item.classList.add("list-group-item-action"); 
    item.innerText = name; 
    return item; 
}