let cureBtn = $(".cure-btn");
let randomBtn = $(".random-btn");
let cureTypeEl = $(".cure-type");

cureBtn.click(function(event){
    event.preventDefault();
    cureTypeEl.text($(this).attr("data-cure"));
    // console.log($(this).attr("data-cure"))
    randomBtn.attr("data-cure",$(this).attr("data-cure"));
    // console.log(randomBtn.attr("data-cure"));
});