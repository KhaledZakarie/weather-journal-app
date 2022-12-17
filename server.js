// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app= express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;
// Spin up the server
app.listen(port, listening);
// Callback to debug
function listening(){
    console.log('server running');
    console.log(`running on localhost: ${port}`);
};


// get routes
app.get('/tempertureData',getData)

function getData(req, res){
    res.send(projectData)
}

//post routes
app.post('/addData', addTemperatureData)

function addTemperatureData(req, res){
    // newEntry = {
    //     temperature: req.body.temperature,
    //     date: req.body.date,
    //     userResponse: req.body.userResponse
    // }
    // projectData.push(newEntry)
    projectData.temperature = req.body.temperature;
    projectData.date = req.body.date;
    projectData.userResponse = req.body.userResponse;
    res.send(projectData)
}