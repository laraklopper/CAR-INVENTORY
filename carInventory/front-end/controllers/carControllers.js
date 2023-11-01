const Car = require('carInventory/models/carSchema.js');// Imports the Car model representing the struction of the document in the MongoDB collection 

// Controller function to create a new car
const addCar = async function (req, res) {
    try {
        const newCar = new Car(req.body);
        await newCar.save();
        res.status(201).json(newCar);
    } 
    catch (error) {
        console.error('Error adding the new car', error.message);
        res.status(500).send('Internal server error');
    }
};

// Controller function to retrieve all cars
const findAllCars = async function (req, res) {
    try {
        const cars = await Car.find();
        res.json(cars);
    } 
    catch (error) {
        console.error('Error fetching cars', error.message);
        res.status(500).send('Internal server Error');
    }
};

// Controller function to update one single car by Id
const updateById = async (req, res) => {
    const { make } = req.params;
    try {
        const updatedCar = await Car.findOneAndUpdate(
            { make },
            { $set: req.body },
            { new: true }
        );
        if (!updatedCar) {
            return res.status(404).send('Car not found');
        }
        res.json(updatedCar);
    } catch (error) {
        console.error('Error updating car', error.message);
        res.status(500).send('Internal server Error');
    }
};

//Export the functions so that they can be used in other parts of the application
module.exports = {
    addCar,
    findAllCars,
    updateById,
};

