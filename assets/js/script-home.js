let homeContainer = $(".home");
let selectedContainer = $(".selected-cure")
let cureBtn = $(".cure-btn");
let randomBtn = $(".random-btn");
let cureTypeEl = $(".cure-type");
let jokeForms = $(".joke-forms");
let activityForms = $(".activity-forms");
let homeBtn = $('.home-btn');
let savedResults = $('.saved-results')
let savedData = [];
let delBtnEl = $(".del-btn");

init();

function init(){
    homeContainer.show();
    selectedContainer.hide();
    // getStoredActivities();
    // getStoredJokes();
}

cureBtn.click(function(event){
    homeContainer.hide();
    selectedContainer.show();
    event.preventDefault();
    cureTypeEl.text($(this).attr("data-cure"));
    // console.log($(this).attr("data-cure"))
    randomBtn.attr("data-cure",$(this).attr("data-cure"));
    // console.log(randomBtn.attr("data-cure"));
    if($(this).attr("data-cure") === "Joke"){
        jokeForms.show();
        activityForms.hide();
        $(".results-display").empty();
        var results = $("<p>");
        results.addClass("results");
        results.text("Please use the form to generate a joke")
        $(".results-display").append(results);
        // $(".results").text(data.activity);
        // console.log(data.activity);
    } else {
        jokeForms.hide();
        activityForms.show();
        $(".results-display").empty();
        var results = $("<p>");
        results.addClass("results");
        results.text("Please use the forms to generate an activity")
        $(".results-display").append(results);
        // $(".results").text(data.activity);
    }
    renderSavedData();
});

//add event listener for when the home button is clicked to take the user to the home page
homeBtn.click(function(){
    homeContainer.show();
    selectedContainer.hide();
})

//this function renders all of the saved data
function renderSavedData(){
    //remove all of the old saved data
    savedResults.empty();
    let cureType = randomBtn.attr("data-cure");
    //if the cure type is an activity or joke, then pull the saved data from local storage and render each of the saved items
    
    if(cureType === "Activity"){
        // check if there is any local storage for activities
        savedData = JSON.parse(localStorage.activities);
        if (savedData.length === 0) {
            appendSavedData(["There are currently no saved activities.","Use some of the inputs above to generate a random activity"]);
            return;
        }
        //for each of the saved information, append it to the display section
        for(let i = 0; i < savedData.length; i++){
            appendSavedData([savedData[i]],i);
        }
    } else {
        // check if there is any local storage for jokes
         console.log("imhere");
        savedData = JSON.parse(localStorage.jokes);
        if (savedData.length === 0) {
            appendSavedData(["There are currently no saved jokes.","Use some of the inputs above to generate a random joke"]);
            return;
        }
        savedData = JSON.parse(localStorage.jokes);
        // savedData = [["What did the duck say to the farmer?","Quack"],["How did the duck cross the road","It flew"]];
        // console.log(savedData)
        //for each of the saved information, append it to the display section
        for(var i = 0; i < savedData.length; i++){
            appendSavedData(savedData[i],i);
        }
    }
}

function appendSavedData(data,index){
    //this line creates results container
    // console.log(index);
    let savedContainer = $('<div>');
    let cureType = randomBtnEl.attr("data-cure");
    savedContainer.addClass("col s12 teal lighten-2 saved-" + cureType + "-container valign-wrapper " + cureType + "-" + index);
    savedContainer.attr("index-number", "" + index);
    //this section creates the saved cure container i.e. the section where all of the saved cure lines go
    let savedCure = $('<div>');
    savedCure.addClass("saved-cure col s11 center-align");
    //append this section to the saved Container
    savedContainer.append(savedCure);
    //this section creates the delete button for the saved item
    let deleteBtn = $('<a>');
    deleteBtn.addClass("waves-effect-teal-lighten-2 col s1 red-text center-align btn-large del-btn");
    //this section creates the delete icon
    let deleteIcon = $('<i>');
    //add materials icon class to the icon element
    deleteIcon.addClass("material-icons");
    //add the text to make the material icon look like an icon
    deleteIcon.text("remove_circle");
    //append the icon to the delete button
    deleteBtn.append(deleteIcon);
    //append the delet button to the saved container
    savedContainer.append(deleteBtn);
    //this for loop runs the length of the pushed data and will append a new line for each of the elements in the pushed data array
    for (i = 0; i < data.length; i++){
        //this line creates a new p tag for each line
        let newLine = $('<p>');
        //adds the text from the element of the data array
        newLine.text(data[i]);
        //appends the new line to the savedCure container
        savedCure.append(newLine);
    }
    //append the individual saved item to the saved results container
    savedResults.append(savedContainer);
    // console.log('here first')
}

//this event listener will delete the saved container that it is attached to
savedResults.click(function(event){
    event.stopPropagation();
    let cureType = randomBtnEl.attr("data-cure");
    let index = 0;
    if($(event.target).hasClass("del-btn")){
        // console.log('here')
        index = $(event.target).parent().attr("index-number");
        // console.log(index);
        // console.log($(".index-"+ index));
        $("." + cureType + "-" + index).remove();
        removeData(cureType,index)
    }
    if($(event.target).hasClass("material-icons")){
        // console.log('is here')
        index = $(event.target).parent().parent().attr("index-number");
        // console.log(index);
        // console.log($(".index-"+ index));
        $("." + cureType + "-" + index).remove();
        removeData(cureType,index)
    }
    var savedElements = $(".saved-" + cureType + "-container");
    // console.log(savedElements.length)
    savedElements.each(function(index){
        for(let i = 0; i < savedElements.length + 1; i++){
            // console.log('here')
            // console.log(cureType + '-' + i);
            savedElements.removeClass(cureType + '-' + i);
            
        }
        
        // console.log(cureType + '-' + index);
        // $(savedElements[index]).addClass(cureType + '-' + index);
        // console.log(savedElements[index])
        for(let i = 0; i < savedElements.length; i++){
            $(savedElements[i]).addClass(cureType + '-' + i);
            $(savedElements[i]).attr("index-number", "" + i);
        }
    })
})

function removeData(cureType,index){
    if(cureType === "Activity"){
        // console.log(storedData[index]);
        storedData.splice(index,1)
        // console.log(storedData);
        localStorage.activities = JSON.stringify(storedData);
    } else {
        // console.log(storedJokes[index]);
        storedJokes.splice(index,1)
        // console.log(storedJokes);
        localStorage.jokes = JSON.stringify(storedJokes);
    }
}

$(document).ready(function(){
    $('select').formSelect();
});