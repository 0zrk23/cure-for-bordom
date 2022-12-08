var randomBtnEl = $('.random-btn');
var activitiesBtnEl = $('.activity');
let random = new URL('https://www.boredapi.com/api/activity/');
//let type = new URL ('http://www.boredapi.com/api/activity?type=recreational')
//let participants = new URL ('http://www.boredapi.com/api/activity?participants=1')
//let priceRange = new URL ('http://www.boredapi.com/api/activity?minprice=0&maxprice=0.1')
var optionsDiv;

//randomBtnEl.click(function() {

// }
// )

randomBtnEl.click(function(event) {
   var cureType = $(this).attr("data-cure");
   console.log(cureType)
   if (cureType === "Activity") {
   fetchAPI(random);
   }
}
) 


function fetchAPI(activityURL) {
fetch(activityURL)
.then(function (response) {
    if (response.ok) {
        response.json().then(function(data){
            console.log(data)
        })
        
        
    } else {
        throw new Error ("Error");
    }
})}



//document.getElementById("dropDown").addEventListener("change", addActivityItem);

function addActivityItem() {
    console.log("Nick");
} 
// .then(function (data) {
//     displayActivities(data);
// })} console.log(data);


// .catch((error) => console.error("Fetch Error:", error));

// function displayActivities(data) {
//     const options = data.random[0];
//     optionsDiv = document.getElementsByClassName("selected-cure");
// }

// const activityName = random.choices;
// const line = document.createElement("p");
// line.innerHTML = activityName;
// optionsDiv.appendChild(line);


// localStorage.setItem("activities", "input");
// var completed = localStorage.getItem("activities");






