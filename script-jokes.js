var randomBtnEl = $('.random-btn');
var JokesBtnEl = $('.Jokes');
let random = new URL('https://official-joke-api.appspot.com/jokes/random');
var JokeTypeForm = $('.joke-type-form');
var saveBtn = $('.save-btn');
var storedData = [];

init();

function init() {
    getStoredJokeForms(storedData)
}

function getStoredJokeForms() {
    if (!localStorage.Jokes) {
        localStorage.setItem("JokesForms", "");
        return;
    }
    storedData = JSON.parse(localStorage.getItem(
        "JokeForms"
    ));
}

randomBtnEl.click(function (event) {
        var cureType = $(this).attr('data-cure');
        //  console.log(curetype)
        if (cureType === "Joke") {
            fetchAPI(random);
        }
    }
)

function fetchAPI() {
    if (!JokeTypeForm) {
        return;
    }
    var jokeType = JokeTypeForm.val();
    if (!jokeType) {
        jokeType = 'general';
    }
    let url = 'https://official-joke-api.appspot.com/jokes/' + jokeType + '/random';
    fetch(
        url
    ).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
                let resultJoke = data[0]
                localStorage.setItem(
                    'generatedJoke'
                    , JSON.stringify(resultJoke))
                if (data.error) {
                    renderError();
                } else {
                    renderResults(resultJoke);
                }
                //document.getElementsByClassName(".saved-cure") = localStorage.getItem(data);
            });
        }
    })
}

saveBtn.click(function (event) {
    saveData()
})

function saveData(data) {
    if (!localStorage.Joke) {
        return;
    }
    var GeneratedJoke = JSON.parse(localStorage.getItem('generatedJoke'));
    if (storedData.Includes(generatedJoke)) {
        return;
    }
    storedData.push(generatedJoke);
    console.log(storedData)
    localStorage.Joke = JSON.stringify(storedData)
}

function renderError() {
    $(".results-display").empty();
    var error = $("p");
    error.addClass("results");
    $(".results-display").append(error);
    $(".results-display").text("We do not havea joke for this")
    console.log(data.error);
}

function renderResults(data) {
    $(".current-joke-setup").text(data.setup);
    $(".current-joke-punchline").text(data.punchline);
}
        

