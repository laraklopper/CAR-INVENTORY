const express = require('express');// Import Express Web framework for handling HTTP requests
const mongoose = require('mongoose');//Import the Mongoose library
const cors = require('cors');// Middleware for enabling Cross-Origin Resource Sharing
const carController = require('./controllers/carControllers');// Import the car controller module
require('dotenv').config();// Load environment variables from .env file

//Extract Environmental Variables
const database = process.env.DATABASE_NAME;//Extract the database name from enviromental variables
const uri = process.env.DATABASE_URL;//Extract the database URL from the enviromental variables
const app = express();// Create an Express application
const port = process.env.PORT || 3001;// Extract the port number from environment variables

//=================CHECK IF ALL THE ENVIRONMENTAL VARIABLES A PRESENT==================
// Conditional rendering to check if the PORT environment variable is missing
if (!port) {
  console.error('Error: PORT environment variable is missing');// If PORT is missing, log an error message to the console
  process.exit(1);// Exit the Node.js process with a non-zero exit code (1)// Exit the Node.js process with a non-zero exit code (1)
}

// Conditional rendering to check if the DATABASE_NAME environment variable is missing
if (!database) {
  console.error('Error: DATABASE_NAME environment variable is missing');// If DATABASE_NAME is missing, log an error message to the console
  process.exit(1);// Exit the Node.js process with a non-zero exit code (1)// Exit the Node.js process with a non-zero exit code (1)
}

// Conditional rendering to check if the DATABASE_URL environment variable is missing
if (!uri) {
  console.error('Error: DATABASE_URL environment variable is missing');
  process.exit(1);// Exit the Node.js process with a non-zero exit code (1)
}

mongoose.Promise = global.Promise;// Set Mongoose to use Node's built-in promises

//==============CONNECT TO MONGODB USING MONGOOSE=======================

mongoose.connect(uri, {
  useNewUrlParser: true,// Use the new URL parser
  useUnifiedTopology: true,// Use the new Server Discover and Monitoring engine
  dbName: database, // Specify the name of the MongoDB database
})
  .then(() => {//Execute when the connection is successful.
    console.log('Connected to MongoDB');//Log a success message when the connection is established.
  })
  .catch((err) => {//Execute if a connection error occurs
    console.error('Error connecting to MongoDB', err);//Log an error message if there's an issue connecting to MongoDB.
  });

/==============MONGO CONNECTION EVENT HANDLERS========================
// Set up an event listener for the 'error' event on the Mongoose connection
mongoose.connection.on('error', function (error) {// This function will be executed when there is an error in the MongoDB connection
  console.log('Could not connect to the database. Exiting now...', error);// Log an error message with details about the connection failure
  process.exit(1);// Terminate the Node.js process with an exit code of 1, indicating an error
});

// Set up an event listener for the 'open' event on the Mongoose connection
mongoose.connection.once('open', function () {// This function will be executed when the MongoDB connection is successfully opened
  console.log('Successfully connected to database');// Log a message indicating that the connection to the database was successful
});

//======================SETUP MIDDLEWARE================================
app.use(express.json());// Middleware to parse JSON in the request body
app.use(cors());// Use the 'cors' middleware

//=================API ROUTES===========================
// API routes using the controller functions
app.post('/addCar', carController.addCar);
app.get('/findAllCars', carController.findAllCars);
app.put('/updateCarById/:make', carController.updateById);
app.delete('/removeCarById/:carId', carController.removeById);//Route to remove car by ID
//================START THE SERVER=========================
// Start the Express server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on ${port}`);// Log a message indicating that the server is running on the specified port.
});
