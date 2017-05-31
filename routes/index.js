var express = require('express');
var router = express.Router();

// We npm installed request, it's in the node_modules folder
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
    var students = [];
    students = ['Guido','Porscha','Hayes','Nick','Daniel'];
    res.render('index', {
        title: 'Express',
        studentsArray: students
    });
});

router.get('/test', function(req, res, next) {
    res.send('<h1>Router Check!</h1>');
});

// Make a route for /weather, specifically a get route.
// If someone makes an http get request to the route below (first arg),
// then run the anon function. The anon function has 2 objects automatically,
// request & response
router.get('/weather', function(req, res) {
    // Set up a var for the api key
    var apikey = 'e312dbeb8840e51f92334498a261ca1d';
    // build the URL we are going to request
    var weatherUrl = "http://api.openweathermap.org/data/2.5/weather?q=Atlanta&units=imperial&APPID="+apikey;
    // Make an HTTP get request to the weather URL
    // Because this is an async task, we provide a function to run, when JS
    // gets back. It has 3 objects, error, response, and data.
    // Error will be null if there is no error.
    // Response holds the status code and any other HTTP stuff
    // Data holds the JSON, if any
    request.get(weatherUrl, function(error, response, data){
        console.log(typeof(data));
        // The JSON comes back in string format. Convert it to native JSON
        var weatherData = JSON.parse(data);
        // Call res.render. Takes 2 args:
        // 1. the ejs file to fetch
        // 2. an object that will be passed to the ejs file. Each property
        // will be available as a var inside the ejs file.
        res.render('weather', {weatherObject: weatherData});
        // res.send('Check the console.');
    });
});

module.exports = router;
