let symptomsLog = "Nothing";
let symptomsArray = []

const options = {
    method: 'GET',
    url: 'https://priaid-symptom-checker-v1.p.rapidapi.com/symptoms',
    params: { language: 'en-gb', format: 'json' },
    headers: {
        'X-RapidAPI-Key': '3be63b2714msh9d243fd4ef7dd1ap1632ebjsn81dc7e84b888',
        'X-RapidAPI-Host': 'priaid-symptom-checker-v1.p.rapidapi.com'
    }
};

axios.request(options).then(function (response) {
    console.log(response.data);
}).catch(function (error) {
    console.error(error);
});




// for (let symptom of symptomsLog) {
//     symptomsArray.push(symptom);
// }
// console.log(symptomsArray);

// for (let symptom of symptomsArray) {
//     console.log(symptom);
// }

