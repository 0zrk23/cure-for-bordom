var randomBtnEl = $('.random-btn');
var JokesBtnEl = $('.Jokes');
// let random = new URL('https://official-joke-api.appspot.com/jokes/random');
var JokeTypeForm = $('.joke-type-form');
var saveBtnEl = $('.save-btn');
var resultsDisplay = $(".results-display");
var storedJokes = [];

// init() 

// function init() {
//     // console.log("im here");
//     getStoredActivities();
//     getStoredJokes();
// } 
    getStoredJokes();


function getStoredJokes() {
    if (!localStorage.jokes) {
        localStorage.setItem("jokes", "");
        return;
    }
    storedJokes = JSON.parse(localStorage.jokes);
}

// randomBtnEl.click(function (event) {
//         var cureType = $(this).attr('data-cure');
//         //  console.log(curetype)
//         if (cureType === "Joke") {
//             fetchJokeAPI();
//         }
//     }
// )

function fetchJokeAPI() {
    if (!JokeTypeForm) {
        
        return;
    }
    var jokeType = JokeTypeForm.val();
    if (!jokeType) {
        // console.log("i am here");
        renderJokeError();
        return;
    }
    if(jokeType === ""){
        // console.log("i am here");
        jokeType = "general"
    }
    let url = 'https://official-joke-api.appspot.com/jokes/' + jokeType + '/random';
    fetch(
        url
    ).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                // console.log(data[0]);
                let result = data[0];
                // console.log([result.setup,result.punchline]);
                let resultJoke = result.setup.split("\n");
                resultJoke.push(result.punchline);
                console.log(resultJoke);
                localStorage.setItem('generatedJoke', JSON.stringify(resultJoke));
                renderJokes();
                // if (data.error) {
                //     renderJokeError();
                // } else {
                //     renderResults(resultJoke);
                // }
                // //document.getElementsByClassName(".saved-cure") = localStorage.getItem(data);
            });
        }
    })
}

// saveBtnEl.click(function(event) {
//     saveJokes();
// })

function saveJokes() {
    
    var cureType = randomBtnEl.attr('data-cure');
    if (cureType !== "Joke") {
        return;
    }
    
    if (!localStorage.generatedJoke) {
        resultsDisplay.empty();
        var error = $("<p>");
        error.addClass("results red-text");
        error.text("Please generate a new joke before trying to save")
        resultsDisplay.append(error);
        return;
    }
    // console.log("iamhere")
    // console.log(JSON.parse(localStorage.generatedJoke));
    var generatedJoke = JSON.parse(localStorage.getItem("generatedJoke"));
    // console.log(storedJokes.includes(generatedJoke));
    if(storedJokes.length === 0){
        storedJokes[0] = generatedJoke;
        localStorage.jokes = JSON.stringify(storedJokes);
        localStorage.removeItem("generatedJoke");
        renderSavedData();
        return;
    } else {
        for(i = 0; i < storedJokes.length; i++){
            let index1 = 0;
            let index2 = 0;
            if(storedJokes[i].length > 2){
                index1 = 2;
            }
            if(generatedJoke.length > 2){
                index2 = 2;
            }
            if(storedJokes[i][index1] === generatedJoke[index2]){
                // console.log('i am here')
                resultsDisplay.empty();
                var error = $("<p>");
                error.addClass("results red-text");
                error.text("You already have this joke saved, Please generate a new one")
                resultsDisplay.append(error);
                return;
            }
        }
    }
    console.log("imhere")
    storedJokes.push(generatedJoke);
    localStorage.jokes = JSON.stringify(storedJokes);
    localStorage.removeItem("generatedJoke");
    renderSavedData();
}

function renderJokeError() {
    resultsDisplay.empty();
    var error = $("<p>");
    error.addClass("results red-text");
    error.text("Please select a joke type before generating a joke")
    resultsDisplay.append(error);
}

function renderJokes() {
    let data = JSON.parse(localStorage.generatedJoke);
    // console.log(data);
    resultsDisplay.empty();
    for(let i = 0; i < data.length; i++){
        let line = $('<p>');
        line.text(data[i])
        line.addClass("results");
        resultsDisplay.append(line);
    }
}
        

