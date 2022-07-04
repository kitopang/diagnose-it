// import axios from "axios"; 

//First page DOM elements
const getStartedButton = document.querySelector("#gsButt");

const biometricsContainer = document.querySelector("#preview"); 
const yearInput = document.querySelector("#yearInput"); 
const maleInput = document.querySelector("#male"); 
const femaleInput = document.querySelector("#female"); 
const submitBiometrics = document.querySelector("#submitGender"); 

//Second page DOM elements
const text1 = document.querySelector("#text1");
const text2 = document.querySelector("#text2"); 
const secondPage = document.querySelector("#secondPage");
const mainContainer = document.querySelector("#main");
const inputContainer = document.querySelector("#inputContainer");
const input = document.querySelector("#symptoms");
const searchResultsContainer = document.querySelector("#searchResults");

const addedSymptomsContainer = document.querySelector("#addedSymptomsContainer");
const addedSymptoms = document.querySelector("#addedSymptoms");
const resultItems = document.querySelector("#resultItems");
const resultsPlaceholder = document.querySelector("#placeholder");
const submitButton = document.querySelector("#submitButt");

const thirdPage = document.querySelector("#thirdPage"); 
const accordion = document.querySelector(".accordion"); 

let doc;
let mouseOver;
let birthyear; 
let genderVal; 

const getSymptoms = function () {
    fetch("./resources/symptoms6_29.json")
        .then(response => {
            return response.json();
        })
        .then(jsondata => doc = jsondata
        );
    secondPage.classList.remove("d-none"); 
    secondPage.scrollIntoView();

    text1.style.opacity = "100";
    biometricsContainer.style.opacity = "100"; 
 
}

getStartedButton.addEventListener("click", getSymptoms);

submitBiometrics.addEventListener("click", () => {
    console.log(doc);
    birthyear = yearInput.value.toString(); 
    if(maleInput.checked) {
        genderVal = "male"; 
    } else if(femaleInput.checked) {
        genderVal = "female"; 
    }

    biometricsContainer.style.opacity = 0; 
    text1.style.opacity = 0; 
    document.querySelector("#ex1").symptomObject = doc[41]; 
    document.querySelector("#ex2").symptomObject = doc[230]; 
    document.querySelector("#ex3").symptomObject = doc[104];
    document.querySelector("#ex4").symptomObject = doc[85]; 

    setTimeout(function() {
        biometricsContainer.classList.add("d-none"); 
        text1.classList.add("d-none"); 
        text2.classList.remove("d-none"); 
        mainContainer.style.opacity = "100"; 
        text2.style.opacity = "100"; 
        input.focus(); 
      }, 500);
})

input.addEventListener("focus", () => {
    searchResultsContainer.classList.add("border");
    searchResultsContainer.classList.add("border-top-0");
    searchResultsContainer.classList.add("p-2");
    searchResultsContainer.classList.remove("d-none");
});


input.addEventListener("focusout", () => {
    console.log("mouse");
    if (!mouseOver) {
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
    if (input.value === "") {
        resultItems.innerHTML = "";
        resultsPlaceholder.classList.remove("d-none");
    } else {
        resultsPlaceholder.classList.add("d-none");
        let searchResults = search(input.value);
        displayResults(searchResults);
    }
});

searchResultsContainer.addEventListener("click", function (e) {
    console.log(e.target.symptomObject)
    let currentSymptom = e.target.symptomObject;
    console.log("hi" + currentSymptom);
    let newItem = createAddedItem(currentSymptom.Name);
    newItem.symptomObject = currentSymptom;


    inputContainer.classList.remove("col-md-12");
    inputContainer.classList.add("col-md-6");
    mainContainer.classList.remove("col-md-6");
    mainContainer.classList.add("col-md-8");

    addedSymptomsContainer.classList.remove("d-none");
    addedSymptoms.appendChild(newItem);

    setTimeout(function(){
        addedSymptomsContainer.style.opacity = "100";

    }, 50); 

});

addedSymptoms.addEventListener("click", function (e) {
    e.target.remove();
    console.log(addedSymptoms.childElementCount);

    if (addedSymptoms.childElementCount === 1) {
        addedSymptomsContainer.style.opacity = "0"; 

        setTimeout(function(){
            addedSymptomsContainer.classList.add("d-none");
            inputContainer.classList.remove("col-md-6");
            inputContainer.classList.add("col-md-12");
            mainContainer.classList.remove("col-md-8");
            mainContainer.classList.add("col-md-6");
            input.focus();
        }, 500); 
    }
});

submitButton.addEventListener("click", () => {
    const addedElements = document.querySelectorAll(".item"); 
    let symptomsList = "["; 
    let count = 0; 

    for(element of addedElements) {
        if(count > 0) {
            symptomsList += ","; 
        }
        symptomsList += element.symptomObject.ID;
        count++; 
    }
    symptomsList += "]";
    console.log(symptomsList); 

    callAPI(symptomsList);
    thirdPage.classList.remove("d-none");  
    setTimeout(function(){
        thirdPage.scrollIntoView({behavior: "smooth"}); 
        accordion.style.opacity = "100"; 
    }, 500); 

  
});

function search(query) {
    let results = [];

    // Search for symptoms that start with the same letters. This has precedence.
    for (symptom of doc) {
        if (results.length >= 10) {
            break;
        }

        if (symptom.Name.toLowerCase().substring(0, query.length) === query) {
            results.push(symptom);
        }
    }

    // Search for symptoms that have the same combination of letters if search array isn't already full. 
    for (symptom of doc) {
        if (results.length >= 10) {
            break;
        }

        if (symptom.Name.toLowerCase().includes(query) && !results.includes(symptom)) {
            results.push(symptom);
        }
    }

    return results;
}

function displayResults(searchResults) {
    resultItems.innerHTML = "";

    if (searchResults.length === 0) {
        let item = createSearchItem("No results");
        item.classList.add("disabled");
        resultItems.appendChild(item);
    } else {
        let num = 0;

        for (symptom of searchResults) {
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
    item.classList.add("bg-light");
    item.innerText = name;
    return item;
}

function createAddedItem(name) {
    let item = document.createElement("li");
    item.classList.add("list-group-item");
    item.classList.add("list-group-item-action");
    item.classList.add("item"); 
    item.innerText = name;
    return item;
}

function callAPI(symptomsList) {
    const options = {
        method: 'GET',
        url: 'https://priaid-symptom-checker-v1.p.rapidapi.com/diagnosis',
        params: {gender: genderVal, year_of_birth: birthyear, symptoms: symptomsList, language: 'en-gb'},
        headers: {
          'X-RapidAPI-Key': '3be63b2714msh9d243fd4ef7dd1ap1632ebjsn81dc7e84b888',
          'X-RapidAPI-Host': 'priaid-symptom-checker-v1.p.rapidapi.com'
        }
      };
      /*
      axios.request(options).then(function (response) {
        let diagnosis = response.data;   
        console.log(diagnosis);
        updateAccordion(diagnosis); 

      }).catch(function (error) {
          console.error(error);
      });
      */

}

let titles = document.querySelectorAll(".accordion-button");
let bodies = document.querySelectorAll(".accordion-body");
let containers = document.querySelectorAll(".accordion-item"); 
function updateAccordion(diagnosisArray) {
    let index = 0; 
    for(diagnosis of diagnosisArray) {
        if(index > 3) {
            break; 
        }
        titles.item(index).innerHTML = "<i>" + (index+1) + ". " + diagnosis.Issue.Name + ": " + diagnosis.Issue.Accuracy + "% accuracy</i>";

        if(index === 0) {
            bodies.item(index).innerHTML = "<strong>Given your symptoms, this is the most likely cause. Additional information:</strong> <br> Also known as: <I>" + diagnosis.Issue.ProfName +"</I>. <br> ICD (international classification of diseases) number: " + diagnosis.Issue.Icd + "<br>ICD name: " + diagnosis.Issue.IcdName + "<br> Specialization: " + diagnosis.Specialisation[diagnosis.Specialisation.length-1].Name;
        } else {
            bodies.item(index).innerHTML = "<strong>Additional information:</strong> <br> Also known as: <I>" + diagnosis.Issue.ProfName +"</I>. <br> ICD (international classification of diseases) number: " + diagnosis.Issue.Icd + "<br>ICD name: " + diagnosis.Issue.IcdName + "<br> Specialization: " + diagnosis.Specialisation[diagnosis.Specialisation.length-1].Name;
        }


        index++; 
    }

    // Remove extra accordion entires 
    let index2 = 0; 
    if(diagnosisArray.length < 4) {
        for(title of titles) {
            if(title.innerText === "empty") {
                containers.item(index).classList.add("d-none"); 
            }

            index2++; 
        }
    }
}
