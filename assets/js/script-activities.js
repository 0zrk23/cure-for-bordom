var randomBtn = document.getElementById("random");
var activitiesBtnEl = document.getElementById("activities");
var url = new URL('https://www.boredapi.com/')

var activities = function (event) {
    fetch(url)
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data){
                displayActivities(data);
            });
        }
    })
    .catch(function (error) {

    }
    )
}

for (var i = 0; i  < activities.length; i++) {
    var completed = activities[i].data
}

var displayActivities = 

// async function fetchActivitiesJSON() {
//     const response = await fetch('http://www.boredapi.com/api/activity/');
//     const activities = await response.json();
//     return activities;
// }





// localStorage.setItem("activities", "input");
// var completed = localStorage.getItem("activities");



activitiesBtnEl.addEventListener('click', hideshow, false, activities);

