const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const carController = require('./controllers/carControllers');

const database = process.env.DATABASE_NAME;
const uri = process.env.DATABASE_URL;
const port = process.env.PORT || 3001;
const app = express();

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

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true, // Added for better index support
    dbName: database
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);
});

mongoose.connection.on('error', function (error) {
    console.log('Could not connect to the database. Exiting now...', error);
    process.exit(1);
});

mongoose.connection.once('open', function () {
    console.log('Successfully connected to database');
});

app.use(cors());
app.use(express.json());

app.post('/addCar', carController.addCar);
app.get('/findAllCars', carController.findAllCars);
app.put('/updateCarById/:make', carController.updateById); // Added a parameter in the route

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
