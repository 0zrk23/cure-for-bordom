let homeContainer = $(".home");
let selectedContainer = $(".selected-cure")
let cureBtn = $(".cure-btn");
let randomBtn = $(".random-btn");
let cureTypeEl = $(".cure-type");
let jokeForms = $(".joke-forms");
let activityForms = $(".activity-forms");
let homeBtn = $('.home-btn');

init();

function init(){
    homeContainer.show();
    selectedContainer.hide();
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
    } else {
        jokeForms.hide();
        activityForms.show();
        
        $(".select-wrapper li").on("click", function(event){
            console.log($(this).children("span").text());
        })
    }
});

// switch (($(this).children("span").text()))

// case x:

homeBtn.click(function(){
    homeContainer.show();
    selectedContainer.hide();
})

$(document).ready(function(){
    $('select').formSelect();
});