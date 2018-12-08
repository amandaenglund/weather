//Jquery
$(document).ready(function(){
    console.log("document ready");
    $(".button").click(function(){
        console.log("slide down");
        $(".answer").slideDown("slow");
    });
});