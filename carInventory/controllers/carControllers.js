const Car = require('../models/carSchema');// Import the Car model representing the structure of the document in the MongoDB collection

// Controller function to create a new car
const addCar = async function (req, res) {//Define an async function to add a new car
  try {
    const newCar = new Car(req.body);      // Create a new Car instance with the request body
    await newCar.save();    // Save the new car to the database
    //The save method is called on the new instance to save it to the MongoDB database.

    res.status(201).json(newCar);    // Respond with the newly created car and a 201 status code (Created)

  } catch (error) {
      //Handle Errors
    console.error('Error adding the new car', error.message);//Log an error message in the console for debugging purposes.
    res.status(500).send('Internal server error');// Respond with a 500 status code, indicating an internal server error, and with a generic error message.
  }
};

// Controller function to retrieve all cars
const findAllCars = async function (req, res) {//Define an aysnc function to fetch all cars from the database
  try {
    const cars = await Car.find();//Fetch all cars from the database
    res.json(cars);//Respond with the list of cars
  } 
  catch (error) {
      //Handle errors
    console.error('Error fetching cars', error.message);//Log an error message in the console for debugging purposes.
    res.status(500).send('Internal server Error');//Send a 500 status code, and an error message
  }
};

// Controller function to update one single car by Id
const updateById = async (req, res) => {//Define an async function to update a single car by its id
  const { make } = req.params;// Extract the 'make' parameter from the request URL
  try {
      //Find and update the car
    const updatedCar = await Car.findOneAndUpdate(
      { make },// Search criteria: find a car with the specified 'make'
      { $set: req.body },// Update the car with the data in the request body
      { new: true }// Return the updated car instead of the original one
    );

      //Conditional rendering to check if the car is found
    if (!updatedCar) {
      return res.status(404).send('Car not found');//Respond with a 404 status code and a message indicating the car is not found
    }

    res.json(updatedCar);//Respond with the updated car
  } 
  catch (error) {
      //Handle errors
    console.error('Error updating car', error.message);//Log an error message in the console for debugging purposes.
    res.status(500).send('Internal server Error');//Respond with a 500 (Internal server error) status code and send an error message
  }
};

//Export all the functions
module.exports = {
  addCar,
  findAllCars,
  updateById,
};
