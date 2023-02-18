// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
const { request, response } = require('express');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;

// Spin up the server 
const server = app.listen(port, listening);
// CallBack to debug
function listening(){
    console.log(`running on localhost: http//localhost:${port}`);
};

// Initialize all route with a callback function 
app.get('/all',sendData);

// callBack function to complete  Get '/all'
function sendData (request, response) {
    response.send(projectData);
};

// Post Route 
app.post('/add', (request,response) =>{
    projectData={
        date:request.body.date,
        temp:request.body.temp,
        content:request.body.content
    };
    response.send(projectData).status(400).end();
});
