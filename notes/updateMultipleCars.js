const updateMultipleCars = async (req, res) => {
    try {
        // Extract old and new values from the request body
        const oldMake = req.body.make;
        const newMake = req.body.newMake;
        const oldModel = req.body.model;
        const newModel = req.body.newModel;
        const oldRegistration = req.body.registration;
        const newRegistration = req.body.newRegistration;
        const oldOwner = req.body.owner;
        const newOwner = req.body.newOwner;

        console.log(oldMake);
        console.log(newMake);
        console.log(oldModel);
        console.log(newModel);
        console.log(oldRegistration);
        console.log(newRegistration);
        console.log(oldOwner);
        console.log(newOwner);

        // Update multiple cars using updateMany
        const updatedCars = await Car.updateMany(
            // Specify the filter criteria for the documents to update
            {
                make: oldMake,
                model: oldModel,
                registration: oldRegistration,
                owner: oldOwner
            },
            {
                // Use $set to update the specified fields with the new values from req.body
                $set: {
                    make: newMake,
                    model: newModel,
                    registration: newRegistration,
                    owner: newOwner
                }
            }
        );

        if (!updatedCars) {
            // If no cars were found for update, respond with a 404 status code and an error message
            return res.status(404).json({ error: 'No cars found for update' });
        }

        // Respond with a JSON object containing the updated cars
        res.json(updatedCars);
    } catch (error) {
        // Handle errors
        console.error('Error updating cars', error.message);
        res.status(500).send({ error: 'Internal server error' });
    }
};
