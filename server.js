//variables
let express = require("express");
let app = express();
let request = require("request");
let bodyParser = require('body-parser')
let rp = require('request-promise');
let path = require("path");
let dotenv = require('dotenv').load();
let apiKey = process.env.myApi;

app.set("view engine", "ejs");
app.use(express.static('public'));


//route 1 - home page
app.get("/", function (req, res) {
  let urlThreeCities = "http://api.openweathermap.org/data/2.5/group?id=1850147,6058560,5128581&units=metric" + "&APPID=" + apiKey;

  request(urlThreeCities, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      let treeCitiesData = JSON.parse(body);
      res.render("index", {treeCitiesData: treeCitiesData});
    }
  });
});



//route 2 - search results
app.get("/results", function (req, res) {
  let city = req.query.location;
  let url = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=metric" + "&APPID=" + apiKey;


    request(url, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        let weatherData = JSON.parse(body);
        res.render("result", {weatherData: weatherData});
        }
      });
    });


//route 3 - about page
app.get("/about", function (req, res) {

    res.render("about");

});

//listen
app.listen (3000, function () {
  console.log("Weather App started");
});
