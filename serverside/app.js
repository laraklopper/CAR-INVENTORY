const express = require('express');// Import Express Web framework for handling HTTP requests
const mongoose = require('mongoose');//Import the Mongoose library
const cors = require('cors');
const carController = require('./controllers/carControllers');// Import the car controller module
require('dotenv').config();// Load environment variables from .env file
const database = process.env.DATABASE_NAME;
const uri = process.env.DATABASE_URL;
const port = process.env.PORT || 3001;
const app = express();

//=================CHECK IF ALL THE ENVIRONMENTAL VARIABLES A PRESENT==================
if (!port) {
    console.error('Error: PORT environment variable is missing');
    process.exit(1);
}

if (!database) {
    console.error('Error: DATABASE_NAME environment variable is missing');
    process.exit(1);
}

if (!uri) {
    console.error('Error: DATABASE_URL environment variable is missing');
    process.exit(1);
}

mongoose.Promise = global.Promise;

//================================================================
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true, 
    dbName: database
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);
});

//==============MONGO CONNECTION EVENT HANDLERS========================

mongoose.connection.on('error', function (error) {
    console.log('Could not connect to the database. Exiting now...', error);
    process.exit(1);
});

mongoose.connection.once('open', function () {
    console.log('Successfully connected to database');
});

//=============SETUP MIDDLEWARE===================
app.use(cors());
app.use(express.json());// Middleware to parse JSON in the request body

//================API ROUTES=============================
// API routes using the controller functions

app.post('/addCar', carController.addCar);
app.get('/findAllCars', carController.findAllCars);
app.put('/updateCarById/:make', carController.updateById); 

//==================START THE SERVER========================
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
