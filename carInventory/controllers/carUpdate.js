const Car = require('../models/carSchema');// Import the Car model representing the structure of the document in the MongoDB collection


const updateMultiple = async (req, res) => {// Define an async function called 'updateMultiple' to handle the update operation
    try {
        // Extract values from the request body for the old and new values of make, model, registration, and owner
        const oldMake = req.body.make;
        const newMake = req.body.newMake;
        const oldModel = req.body.model;
        const newModel = req.body.newModel;
        const oldRegistration = req.body.registration;
        const newRegistration = req.body.newRegistration;
        const oldOwner = req.body.owner;
        const newOwner = req.body.newOwner;

        const updateCriteria = {};        // Initialize an empty object to store the update criteria


        // Conditional rendering to check if the old and new values are present, then add them to the update criteria
        if (oldMake && newMake) updateCriteria.make = oldMake;
        if (oldModel && newModel) updateCriteria.model = oldModel;
        if (oldRegistration && newRegistration) updateCriteria.registration = oldRegistration;
        if (oldOwner && newOwner) updateCriteria.owner = oldOwner;

        // Initialize an empty object to store the fields to be updated
        const updateFields = {};

        // Conditional rendering to check if the new value for 'make' is present, then add it to the updateFields
        if (newMake) updateFields.make = newMake;
        if (newModel) updateFields.model = newModel;
        if (newRegistration) updateFields.registration = newRegistration;
        if (newOwner) updateFields.owner = newOwner;

        // Use a single 'updateMany' call to update the documents based on the criteria and set the specified fields
        const updatedCars = await Car.updateMany(updateCriteria, { $set: updateFields });
        // Find the updated cars based on the criteria
        const updatedCar = await Car.find(updateCriteria);

        res.json(updatedCar);        // Respond with JSON containing the updated cars


        console.log(updatedCar);        // Log the updated cars to the console

    } catch (error) {
        // Handle errors during the database query or processing
        console.error('Error updating cars', error.message);// Log an error message in the console for debugging purposes


        res.status(500).send('Internal Server Error');// Respond with a 500 (Internal Server Error) status code and an error message

    }
}

// Export the 'updateMultiple' function for use in other parts of the application
module.exports = {
    updateMultiple
};
