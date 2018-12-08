var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static("website"));

app.listen(3000, listening);
function listening(){
   console.log("listening . . .");
}

app.use( ( req, res, next ) => {
    setTimeout(next, 400 );
 });

////////////
//MINA VARIABLER
// var rRequest = require("request");
const fetch = require("node-fetch");
let parsedData = "";
let temp = "";
let city = "";
let svar = "";
var list = {};
let clothes = "";
let foto = "";


//Skriver ut formuläret från post_form_weather.pug  OK!
app.get('/weather', function(request, response){
    response.render('post_form_weather', list);
});


//Click på submit OK!
app.post('/clothes', function(request, response){

    city = request.body.city
    
    getData(city);
    
    return response.redirect('back');
    
});



// Hämtar API:n med FETCH
const getData = async function (city) {

    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&APPID=7e3528d98d4f8d06d7ac8d1ea40592bd";

    try {
        const response = await fetch(url);
        const json = await response.json();
        list["name"] = json.name;
        var num = json.main.temp - 273;
        var temp = num.toFixed(0);
        list["temp"] = temp
        list["hum"] = json.main.humidity;
        
        if (temp < 0) {
            console.log("Bär halsduk");
            clothes = "Bär halsduk";
            foto = "https://www.shitpostbot.com/img/sourceimages/lenny-kravitz-scarf-583cc9144157a.jpeg"
        } else if (temp > 0) {
            console.log("Bär shorts");
            clothes = "Bär shorts";
            foto = "http://www.wigglestatic.com/product-media/5360091241/Assos-T-equipe_s7-Bib-Shorts-Lycra-Cycling-Shorts-Black-Volkanga-SS16-11-10-161-12-s.jpg?w=430&h=430&a=7"
        } else {
            console.log("Gå naken");
            clothes = "Gå naken";
            foto = "https://www.svtstatic.se/image-cms/oppet-arkiv/1485507871000/incoming/article12126058.svt/ALTERNATES/extralarge/ballongdansen-jpg"
        };
        list["clothes"] = clothes
        list["foto"] = foto;
        
    } catch (error) {
        console.log(error);
    }
};










    // //Hämtar API:n med REQUEST  OK!
    // rRequest("https://api.openweathermap.org/data/2.5/weather?q=London&APPID=7e3528d98d4f8d06d7ac8d1ea40592bd", function(error, response, body) {
    //     parsedData = JSON.parse(body);
    //     temp = parsedData.main.temp;
    //     svar = "Vädret i " + city + " är " + temp + " grader";
    //     console.log(svar);
    // });

