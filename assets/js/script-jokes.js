var randomBtnEl = $('.random-btn');
var JokesBtnEl = $('.Jokes');
// let random = new URL('https://official-joke-api.appspot.com/jokes/random');
var JokeTypeForm = $('.joke-type-form');
var saveBtnEl = $('.save-btn');
var resultsDisplay = $(".results-display");
var storedData = [];

// init();

// function init() {
//     getStoredJokeForms()
// }

// function getStoredJokeForms() {
//     if (!localStorage.jokes) {
//         localStorage.setItem("jokes", "");
//         return;
//     }
//     storedData = JSON.parse(localStorage.jokes);
// }

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
        renderError();
        return;
    }
    if(jokeType === ""){

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
                let resultJoke = [result.setup,result.punchline];
                // console.log(resultJoke);
                localStorage.setItem('generatedJoke', JSON.stringify(resultJoke));
                renderResults();
                // if (data.error) {
                //     renderError();
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
    if (!localStorage.Joke) {
        return;
    }
    
}

function renderError() {
    resultsDisplay.empty();
    var error = $("<p>");
    error.addClass("results");
    error.text("Please select a joke type before generating random joke")
    resultsDisplay.append(error);
}

function renderResults() {
    let data = JSON.parse(localStorage.generatedJoke);
    // console.log(data);
    resultsDisplay.empty();
    let setup = $('<p>');
    setup.text(data[0])
    setup.addClass("results");
    resultsDisplay.append(setup);
    let punchline = $('<p>');
    punchline.text(data[1]);
    punchline.addClass("results");
    resultsDisplay.append(punchline);
   
    // $(".results-display").empty();
    // var  = $("<p>");
    // error.addClass("results");
    // $(".results-display").append(error);
    // $(".current-joke-setup").text(data.setup);
    // $(".current-joke-punchline").text(data.punchline);
}
        

