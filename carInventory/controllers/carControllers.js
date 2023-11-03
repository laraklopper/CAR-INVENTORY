const Car = require('carInventory/models/carSchema.js');// Import the Car model representing the structure of the document in the MongoDB collection

// Controller function to add a new car to the collection
const addCar = async function (req, res) {//Define an async function to add a new car 
    try {
        const newCar = new Car(req.body);// Create a new Car instance with the request body and save it to the database
        await newCar.save();
        //the .save() Asynchronous method to save changes to the database
        //The save() function is used to save the document to the database.

        res.status(201).json(newCar);// Respond with the newly created car and a 201 status code (Created)

    } catch (error) {
        // Handle errors by logging the error, sending a 500 status code, and an error message
        console.error('Error adding the new car', error.message);//Log an error message in the console 
        res.status(500).send('Internal server error');//Send a 500 status code and an error message
    }
};

// Controller function to retrieve all cars
const findAllCars = async function (req, res) {//Define an aysnc function to fetch all cars from the database
    try {
        // Fetch all cars from the database
        const cars = await Car.find();

        
        res.json(cars);// Respond with the list of cars
    } catch (error) {
        // Handle errors 
        console.error('Error fetching cars', error.message);//Log an error message in the console
        res.status(500).send('Internal server Error');//Sending a 500 status code, and an error message
    }
};

// Controller function to update one single car by Id
const updateById = async (req, res) => {//Define an async function to update a single car by its id
    const { make } = req.params;
    try {
        // Find and update the car by its make (assuming 'make' is a unique identifier)
        const updatedCar = await Car.findOneAndUpdate(
            { make },
            { $set: req.body }, // Update the car with the data in the request body
            { new: true } // Return the updated car instead of the original one
        );

        // If the car is not found, respond with a 404 status code and a message
        if (!updatedCar) {
            return res.status(404).send('Car not found');
        }

        // Respond with the updated car
        res.json(updatedCar);
    } catch (error) {
        //Handle errors
        console.error('Error updating car', error.message);// Handle errors by logging the error,
        res.status(500).send('Internal server Error');// sending a 500 status code, and an error message
    }
};

// Export the functions so that they can be used in other parts of the application
module.exports = {
    addCar,
    findAllCars,
    updateById,
};
