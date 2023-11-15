const updateMultipleCars = async (req, res) => {//Define an async function to update multiple cars
    try {
        // Extract old and new values from the request body
        const oldOwner = req.body.owner
        const newOwner = req.body.newOwner
     
        // Log extracted values for debugging purposes
        console.log('Old Owner:', oldOwner);
        console.log('New Owner:', newOwner);


        // Update the cars based on the filter criteria
        const updatedCar = await Car.updateMany(
            { owner: oldOwner }, // Use the variable oldOwner here
            { $set: { owner: newOwner } },
            { new: true } // This option is not necessary for updateMany
        );

        //Conditional rendering to check if the car is found
        if (!updatedCar) {
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
