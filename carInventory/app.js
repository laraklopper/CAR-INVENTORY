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
    console.error('Error: DATABASE_URL environment variable is missing');// If DATABASE_URL is missing, log an error message to the console for debugging purposes
    process.exit(1);// Exit the Node.js process with a non-zero exit code (1)
}

//==============CONNECT TO MONGODB USING MONGOOSE=======================
mongoose.Promise = global.Promise; // Set Mongoose to use Node's built-in promises


// Function to establish MongoDB connection
const connectDB = async () => {// Define an async function to connect to MongoDB
    try {
        await mongoose.connect(uri, {
            dbName: database,//Specify the database name
            serverSelectionTimeoutMS: 5000,
            connectTimeoutMS: 10000,
        })
        console.log("Successfully connected to MongoDB");//Log a success message in the console if the connection is successful

    } catch (error) {
        console.error("Error connecting to MongoDB", error);
        process.exit(1)
    }
}
//==============MONGO CONNECTION EVENT HANDLERS========================
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

app.post('/addCar', carController.addCar); //route to add a car
app.get('/findAllCars', carController.findAllCars);//Route to find all cars
app.put('/updateById/:_id', carController.updateById);//Route to update a car by ID
app.delete('/removeById/:_id', carController.removeById);//Route to remove car by ID
app.post('/findByModel', carController.findByModel);//Route to find cars by model based on a certain criteria
app.put('/updateMultipleCars', carController.updateMultipleCars )//Route to update multiple cars

//================START THE SERVER=========================
// Start the server and listen on the specified port
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
    })
}).catch(err => {
    console.error('Database connection failed:', err);
    process.exit(1)
})
