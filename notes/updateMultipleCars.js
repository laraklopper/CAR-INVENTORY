// Controller function to update multiple cars
const updateMultipleCars = async (req, res) => {// Define an async function to update multiple cars
    try {
        // Extract old and new values from the request body
        const oldOwner = req.body.oldOwner; // Change to req.body.oldOwner to match the request body
        const newOwner = req.body.newOwner;

        // Log extracted values for debugging purposes
        console.log('Old Owner:', oldOwner);
        console.log('New Owner:', newOwner);

        // Use updateMany to update cars based on the old owner
        const result = await Car.updateMany(
            { owner: oldOwner },// Criteria for updating cars with the old owner value
            { $set: { owner: newOwner } },// Update operation: set the 'owner' field to the new owner value
            { new: true } // Options object: { new: true } returns the modified documents
        );

        if (result.nModified === 0) { // Access nModified property from the result object
             /*The nModified property checks represents the number of documents to be modified during the update.
           This condition checks if no documents were modified. */
            return res.status(404).json({ error: 'No cars found to update' });
               // If no cars were found for update, respond with a 404 (Not found) status code and an error message
        }

        console.log(result); // Log the result for debugging purposes

        // Find and return the updated cars
        const updatedCars = await Car.find({ owner: newOwner });
        res.json(updatedCars);
    } catch (error) {
        // Handle errors during the database query or processing
        console.error('Error updating cars', error.message); // Log error message in the console for debugging purposes
        res.status(500).send({ error: 'Internal server error' }); // Respond with a 500 (Internal Server Error) status code and an error message
    }
};
