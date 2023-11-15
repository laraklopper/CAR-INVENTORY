const Car = require('../models/carSchema');// Import the Car model representing the structure of the document in the MongoDB collection

//-----------------GET REQUEST----------------------
// Controller function to retrieve all cars
const findAllCars = async function (req, res) {//Define an aysnc function to fetch all cars from the database
    try {
    // Fetch all cars from the database based on any optional query parameters in req.body
        const cars = await Car.find(req.body);
        res.json(cars);// Respond with the list of cars
    } 
    catch (error) {
      // Handle errors 
        console.error('Error fetching cars', error.message);//Log an error message in the console for debugging purposes.
        res.status(500).send('Internal server Error');//Send a 500 status code, and an error message
    }
};

//-----------------POST REQUEST----------------------------------
const addCar = async function (req, res) {//Define an async function to add a new car
    try {
        const newCar = new Car(req.body);// Create a new Car instance with the request body and save it to the database
        await newCar.save();// Save the new car to the database
        
        res.status(201).json(newCar);// Respond with the newly created car and a 201 status code (Created)
    } 
    catch (error) {
    // Handle errors 
        console.error('Error adding the new car', error.message);//Log an error message in the console for debugging purposes.
        res.status(500).send('Internal server error');//Send a 500 status code and an error message
    }
};

//Controller function to find cars older than 5 years
const findByModel = async (req, res) => {//Define an async function to find cars older than 5 years from the database
    try {
        const model = parseInt(req.body.model);
        const cars = await Car.find({ model: { $lte: 2018 } });

                // Use the Car model to find cars where the 'model' field is less than or equal to 2018
        if (!cars || cars.length === 0) {
            return res.status(404).json({ error: "No cars found" });
        }

        res.json(cars);
    } 
    catch (error) {
        //Handle errors
        console.error('error finding cars', error.message); //Log error message in the console for debugging puposes
        res.status(500).send('Internal server Error');// Respond with a 500 (Internal server error) status code and an error message
    }
}

//-----------------PUT REQUESTS------------------------
// Controller function to update one single car by Id
const updateById = async (req, res) => {
    const { _id } = req.params;

    try {
          // Find and update the car 
        const updatedCar = await Car.findByIdAndUpdate(
            _id,
            { $set: req.body }, // Update the car with the data in the request body
            { new: true } // Return the updated car instead of the original one
        );

       //Conditional rendering to check if the car is found
        if (!updatedCar) {
            return res.status(404).json('Car not found');
            //Respond with a 404 ()status code and a message indicating the car is not found
        }

        res.json(updatedCar);// Respond with the updated car
        console.log(updatedCar);//Log the updated car to the console
    } 
    catch (error) {
          //Handle errors
        console.error('Error updating car', error.message);// Handle errors by logging the error,
        res.status(500).send('Internal server Error');// sending a 500 status code, and an error message
    }
};

// Controller function to update multiple cars
const updateMultipleCars = async (req, res) => {//Define an async function to update multiple cars
    try {
    // Extract old and new values from the request body
        const oldOwner = req.body.owner;
        const newOwner = req.body.newOwner;

    // Log extracted values for debugging purposes
        console.log('Old Owner:', oldOwner);
        console.log('New Owner:', newOwner);

    // Update the cars based on the filter criteria
        const { nModified } = await Car.updateMany(
            { owner: oldOwner },
            { $set: { owner: newOwner } }
        );

         if (nModified === 0) {
            // If no cars were found for update, respond with a 404 status code and an error message
            return res.status(404).json({ error: 'No cars found for update' });
        }

        // Find and return the updated cars
        const updatedCars = await Car.find({ owner: newOwner });
        res.json(updatedCars);
    } 
    catch (error) {
          // Handle errors
        console.error('Error updating cars', error.message);//Log error message in the console for debugging puposes
        res.status(500).send({ error: 'Internal server error' });// Respond with a 500 (Internal Server Error) status code and an error message
    }
};

//--------------DELETE REQUESTS---------------------
//Controller function to remove one car
const removeById = async (req, res) => {//Define an async function to remove a car from the database
    const  _id  = req.params._id;//Extract the Id parameter from the URL

    // console.log(_id + " Remove by Id");
    try {
        //Find and remove a car
        const removedCar = await Car.findOneAndRemove({ _id });

         //Conditional rendering to check if the car is found
        if (!removedCar) {
            return res.status(404).json({ error: 'Car not found' })
        //Respond with a 404 status code and a message indicating the car is not found
        }

        res.json({ message: 'Car removed successfully' });//Respond with a JSON object containing a success message
    } 
    catch (error) {
        //Handle errors
        console.error('Error removing car', error.message); //Log error message in the console for debugging puposes
        res.status(500).send('Internal server Error');   // Handle errors during the removal process
    }
};

//-----------------EXPORT FUNCTIONS----------------
// Export the functions so that they can be used in other parts of the application
module.exports = {
    addCar,
    findAllCars,
    updateById,
    removeById,
    findByModel,
    updateMultipleCars
};
