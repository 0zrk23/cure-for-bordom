var randomBtnEl = $('.random-btn');
var activitiesBtnEl = $('.activity');
let random = new URL('https://www.boredapi.com/api/activity/');
var activityTypeForm = $('.activity-type-form');
var participants = $('.participants-form');
var price = $('.max-price-form');
var saveBtn = $('.save-btn');
var storedData = [];

init() 

function init() {
    getStoredActivities() 

} 

function getStoredActivities() {
    if (!localStorage.activities) {
        localStorage.setItem("activities", "");
        return;
    } 
    storedData = JSON.parse(localStorage.activities);

}


randomBtnEl.click(function(event) {
   var cureType = $(this).attr("data-cure");
//    console.log(cureType)
   if (cureType === "Activity") {
   fetchAPI(random);
   }
}
) 


function fetchAPI() {
    if (!activityTypeForm) {
    return;
    }
    console.log('https://www.boredapi.com/api/activity?type=' + activityTypeForm.val() + '&minprice=0&maxprice=' + price.val());
    fetch('https://www.boredapi.com/api/activity?type=' + activityTypeForm.val() + '&minprice=0&maxprice=' + price.val())
    .then(function (response) {
        if (response.ok) {
        response.json().then(function(data){
            console.log(data);
        localStorage.setItem("generatedActivity", JSON.stringify(data.activity));
        if (data.error) {
            renderError();

        } else {
            renderResults(data);
            
        }
        
        document.getElementsByClassName(".saved-cure").innerHTML = localStorage.getItem(data);
        })
    }}
    )};

saveBtn.click(function(event) {
    saveData()

}
)



function saveData() { 
    if (!localStorage.generatedActivity) {
        return;
    } 
    var generatedActivity = JSON.parse(localStorage.generatedActivity);
    if (storedData.includes(generatedActivity)) {
        return;
    }
    
    storedData.push(generatedActivity);
    console.log(storedData)
    localStorage.activities = JSON.stringify(storedData)

}


function renderError() {
    $(".results-display").empty();
    var error = $("<p>");
    error.addClass("results");
    $(".results-display").append(error);
    $(".results").text("Results do not exist for these parameters. Try different values.");
    console.log(data.error);


}

function renderResults(data) {

    $(".results-display").empty();
    var results = $("<p>");
    results.addClass("results");
    $(".results-display").append(results);
    $(".results").text(data.activity);
    console.log(data.activity);
} 



// $(".activity-type-form").click(displayActivities {
//     console.log("Nick")
//     +
// }



// $(".participants-form").click
// $(".max-price-form")


// function displayActivities(data) {
//     const options = data.random[0];
//     optionsDiv = $(".results-container");
// }

// const activityName = random.choices;
// const line = document.createElement("");
// line.innerHTML = activityName;
// optionsDiv.(line);
// console.log(activityName);
// console.log(line);
// console.log(optionsDiv);


// .then(function (data) {
//     displayActivities(data);
// })} console.log(data);


// .catch((error) => console.error("Fetch Error:", error));




// localStorage.setItem("activities", "input");
// var completed = localStorage.getItem("activities");






