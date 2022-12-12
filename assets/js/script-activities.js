var randomBtnEl = $('.random-btn');
var activitiesBtnEl = $('.activity');
let random = new URL('https://www.boredapi.com/api/activity/');
var activityTypeForm = $('.activity-type-form');
var participants = $('.participants-form');
var price = $('.max-price-form');
var saveBtn = $('.save-btn');
var storedData = [];


// init() 

// function init() {
//     // console.log("im here"
//     getStoredActivities();
//     getStoredJokes();
// } 
    // getStoredActivities();
    

function getStoredActivities() {
    if (!localStorage.activities) {
        localStorage.setItem("activities", storedData);
        return;
    } 
    console.log("imhere")
    storedData = JSON.parse(localStorage.getItem("activities"));

}


randomBtnEl.click(function(event) {
   var cureType = randomBtnEl.attr("data-cure");
//    console.log(cureType)
     if (cureType === "Activity") {
        fetchActivityAPI();
        return;
    }
    if (cureType === "Joke") {
        fetchJokeAPI();
        return;
    }
}
) 


function fetchActivityAPI() {
    if (!activityTypeForm) {
    return;
    }
    // console.log('https://www.boredapi.com/api/activity?type=' + activityTypeForm.val() + '&minprice=0&maxprice=' + price.val());
    fetch('https://www.boredapi.com/api/activity?type=' + activityTypeForm.val() + '&minprice=0&maxprice=' + price.val())
    .then(function (response) {
        if (response.ok) {
        response.json().then(function(data){
            // console.log(data);
        localStorage.setItem("generatedActivity", JSON.stringify(data.activity));
        if (data.error) {
            renderActivityError();

        } else {
            renderActivities(data);
            
        }
        
        })
    }}
    )};

saveBtn.click(function(event) {
    // console.log('here');
    saveActivities();
    saveJokes();
}
)

function saveActivities(target) { 
    
    var cureType = randomBtnEl.attr('data-cure');
    // console.log(cureType);
    if (cureType !== "Activity") {
        // console.log("im here")
        return;
    }
    if (!localStorage.generatedActivity) {
        resultsDisplay.empty();
        var error1 = $("<p>");
        error1.addClass("results red-text");
        error1.text("You already have this activity saved.")
        resultsDisplay.append(error1);
        var error2 = $("<p>");
        error2.addClass("results red-text");
        error2.text("Please generate a new activity before trying to save.")
        resultsDisplay.append(error2);
        return;
    } 
    var generatedActivity = JSON.parse(localStorage.getItem("generatedActivity"));
    if (storedData.includes(generatedActivity)) {
        // console.log('i am here')
        resultsDisplay.empty();
        var error = $("<p>");
        error.addClass("results red-text");
        error.text("You already have this activity saved, Please generate a new one")
        resultsDisplay.append(error);
        return;
    }
    
    storedData.push(generatedActivity);
    // console.log(storedData)
    localStorage.activities = JSON.stringify(storedData);
    localStorage.removeItem("generatedActivity");
    renderSavedData();
}


function renderActivityError() {
    $(".results-display").empty();
    var error = $("<p>");
    error.addClass("results red-text");
    $(".results-display").append(error);
    $(".results").text("Results do not exist for these parameters. Please try different values.");
    // console.log(data.error);


}

function renderActivities(data) {

    $(".results-display").empty();
    var results = $("<p>");
    results.addClass("results");
    $(".results-display").append(results);
    $(".results").text(data.activity);
    // console.log(data.activity);
} 







