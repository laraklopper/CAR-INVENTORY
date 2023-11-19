const Car = require('../models/carSchema');// Import the Car model representing the structure of the document in the MongoDB collection

//-----------------GET REQUEST----------------------
// Controller function to retrieve all cars
const findAllCars = async function (req, res) {//Define an aysnc function to fetch all cars from the database
    try {
        // Fetch all cars from the database based on any optional query parameters in req.query
        const cars = await Car.find(req.body);//Fetch all cars based on the query parameters in the request body using `Car.find()`.
        res.json(cars);// Respond with the list of cars
    } 
    catch (error) {
        // Handle errors during the database query or processing
        console.error('Error fetching cars', error.message);//Log an error message in the console for debugging purposes.
        res.status(500).send('Internal server Error');//Send a 500 status code, and an error message
        //The HTTP 500 (Internal Server Error) server error response code indicates that the server encountered an 
        // unexpected condition that prevented it from fulfilling the request.
    }
};

//-----------------POST REQUEST----------------------------------
// Controller function to create a new car
const addCar = async function (req, res) {//Define an async function to add a new car 
    try {
         const newCar = new Car(req.body);// Create a new Car instance with the request body and save it to the database
        await newCar.save(); // Save the new car to the database

        res.status(201).json(newCar);// Respond with the newly created car and a 201 status code (Created)
        //The HTTP 201 (Created) success status response code indicates that the request has succeeded and has led to the creation of a resource.
    } 
    catch (error) {
        // Handle errors 
        console.error('Error adding the new car', error.message);//Log an error message in the console for debugging purposes.
        res.status(500).send('Internal server error');//Send a 500 (Internal server error) status code and an error message
    }
};

//Controller function to find cars older than 5 years
const findByModel = async (req, res) => {//Define an async function to find cars older than 5 years from the database
    try {
    // Get the current year to calculate the threshold for models older than 5 years
        const currentYear = new Date().getFullYear();
        // Use the Car model to find cars where the 'model' field is less than or equal to 5 years ago
        const cars = await Car.find({ model: { $lte: currentYear - 5 } });

        // Use the Car model to find cars where the 'model' field is less than or equal to 2018
        // const cars = await Car.find({ model: { $lte: 2018 } })
       
        // Conditional rendering to check whether cars exist based on the specified criteria
        if (!cars || cars.length === 0) {
            // Respond with a 404(Not found) status code and a JSON object indicating no cars were found
            return res.status(404).json({ error: "No cars found" });
        }

        res.json(cars);// Respond with a JSON array of cars that are older than 5 years
    } 
    catch (error) {
        // Handle errors during the database query or processing
        console.error('Error finding cars', error.message);//Log error message in the console for debugging pupose
        res.status(500).send('Internal server Error');// Respond with a 500 (Internal Server Error) status code and an error message

    }
}

//-----------------PUT REQUESTS------------------------
// Controller function to update one single car by Id
const updateById = async (req, res) => {//Define an async function to update a single car by its id
    const { _id } = req.params;// Extract the 'make' parameter from the request URL

    try {
        // Find and update the car 
        const updatedCar = await Car.findByIdAndUpdate(
            //Use `await` to asynchronously find a car by its ID (`_id`) and update its properties using `Car.findByIdAndUpdate`.
            _id,
            { $set: req.body }, // Update the car with the data in the request body
            { new: true }// Return the updated car instead of the original one
            //`{ new: true }` option returns the updated car rather than the original one.
        );
     
        //Conditional rendering to check if the car is found
        if (!updatedCar) {
            return res.status(404).json('Car not found');
            //Respond with a 404 (Not found)status code and a message indicating the car is not found
        }

           res.json(updatedCar);// Respond with the updated car
        console.log(updatedCar);//Log the updated car to the console


    } 
    catch (error) {
       //Handle errors  during the database query or processing
        console.error('Error updating car', error.message);//Log error message in the console for debugging puposes
        res.status(500).send('Internal server Error');// sending a 500 (Internal server Error) status code, and an error message
    }
};

// Controller function to update multiple cars
const updateMultipleCars = async (req, res) => {//Define an async function to update multiple cars
    try {
        // Extract old and new values from the request body
        const { oldOwner, newOwner, oldMake, newMake, oldRegistration, newRegistration, oldModel, newModel } = req.body;

        // Log extracted values for debugging purposes
        console.log('Old Make:', oldMake);
        console.log('New Make:', newMake);
        console.log('Old Model:', oldModel);
        console.log('New Model:', newModel);
        console.log('Old Registration:', oldRegistration);
        console.log('New Registration:', newRegistration);
        console.log('Old Owner:', oldOwner);
        console.log('New Owner:', newOwner);
        
        // Update the cars based on the filter criteria
        //Use updateMany to update multiple cars in the database based on a certain criteria
        await Car.updateMany( 
            //Criteria for car make
            { make: oldMake },
            { $set: { make: newMake } },
            {new : true}
        );
        
        await Car.updateMany(
            //Criteria for car model
            { model: oldModel },
            { $set: { model: newModel } },
            {new : true}
        );
        
        await Car.updateMany(
            //Criteria for car registration
            { registration: oldRegistration },
            { $set: { registration: newRegistration } },
            {new : true}
        );
        
        await Car.updateMany(
            //Criteria for car owner
            { owner: oldOwner },
            { $set: { owner: newOwner } },
            {new : true}
        );

        // Find and return the updated cars
        // After updating the cars, it queries the database to fetch the cars that have been updated based on the new values.
        const updatedCars = await Car.find({
            make: newMake,
            model: newModel,
            registration: newRegistration,
            owner: newOwner
        });
        
        res.json(updatedCars);// Respond with the updated cars
    } 
    catch (error) {
        //Handle errors during the database query or processing
        console.error('Error updating cars', error.message);//Log error message in the console for debugging puposes
        res.status(500).json({ error: 'Internal server error' });// Respond with a 500 (Internal Server Error) status code and an error message
    }
};

// const updateMultipleCars = async (req, res) => {
//     try {
//         const oldOwner = req.body.owner
//         const newOwner = req.body.newOwner
     
//         console.log('Old Owner:', oldOwner);
//         console.log('New Owner:', newOwner);
     
//         const updatedCar = await Car.updateMany(
        //Use the `Car.updateMany()` method with a query to find cars with the old owner and an update to set the new owner.
//             { owner: oldOwner },
//             { $set: { owner: newOwner } },
//             { new: true }
//         );

//         if (!updatedCar) {
//             return res.status(404).json({ error: 'No cars found for update' });
//         }

//         const updatedCars = await Car.find({ owner: newOwner });
//         res.json(updatedCars);

//     } catch (error) {
//         console.error('Error updating cars', error.message);
//         res.status(500).send({ error: 'Internal server error' });
//     }
// };
//--------------DELETE REQUESTS---------------------
//Controller function to remove one car
const removeById = async (req, res) => {//Define an async function to remove a car from the database
    const _id = req.params._id;//Extract the Id parameter from the URL

    try {
        //Find and remove a car
        const removedCar = await Car.findOneAndDelete({ _id });

       //Conditional rendering to check if the car is found
        if (!removedCar) {
            return res.status(404).json({ error: 'Car not found' });
        //Respond with a 404 (Not found)status code and a message indicating the car is not found
        }

        res.json({ message: 'Car removed successfully' });//Respond with a JSON object containing a success message
    } 
    catch (error) {
       //Handle errors
        console.error('Error removing car', error.message); //Log error message in the console for debugging puposes
        res.status(500).send('Internal server Error'); // Respond with a 500 (Internal Server Error) status code and an error message
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
