const updateMultipleCars = async (req, res) => {//Define an async function to update multiple cars
    
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

    // Log extracted values for debugging purposes
    console.log('Old Make:', oldMake);
    console.log('New Make:', newMake);
    console.log('Old Model:', oldModel);
    console.log('New Model:', newModel);
    console.log('Old Registration:', oldRegistration);
    console.log('New Registration:', newRegistration);
    console.log('Old Owner:', oldOwner);
    console.log('New Owner:', newOwner);

    // Update the cars based on the filter criteria for make
    const updatedMake = await Car.updateMany(
      { make: oldMake },// Criteria for updating cars with the old make value
      { $set: { make: newMake } },// Update operation: set the 'make' field to the new make value
      { new: true }// Options object: { new: true } returns the modified documents
    );

    // Conditional rendering to check if any document was updated for make
    if (updatedMake.nModified === 0) {
        /*The nModified property checks represents the number of documents to be modified during the update.
           This condition checks if no documents were modified. */
      return res.status(404).json({ error: 'No car make found to be updated' });
            // If no cars were found for update, respond with a 404 (Not found) status code and an error message
    }

    // Update the cars based on the filter criteria for model
    const updatedModel = await Car.updateMany(
      { model: oldModel },// Criteria for updating cars with the old model value
      { $set: { model: newModel } },// Update operation: set the 'model' field to the new model value
      { new: true }// Options object: { new: true } returns the modified documents
    );

            // Conditional rendering to check if any document was updated for model
    if (updatedModel.nModified === 0) {
        /*The nModified property checks represents the number of documents to be modified during the update.
           This condition checks if no documents were modified. */
      return res.status(404).json({ error: 'No car model found to be updated' });
            // If no cars were found for update, respond with a 404 (Not found) status code and an error message
    }

    // Update the cars based on the filter criteria for registration
    const updatedRegistration = await Car.updateMany(
      { registration: oldRegistration },// Criteria for updating cars with the old registration value
      { $set: { registration: newRegistration } },// Update operation: set the 'registration' field to the new registration value
      { new: true }// Options object: { new: true } returns the modified documents
    );

      // Conditional rendering to check if any document was updated for registration
    if (updatedRegistration.nModified === 0) {
        /*The nModified property checks represents the number of documents to be modified during the update.
           This condition checks if no documents were modified. */
      return res.status(404).json({ error: 'No car registration found to be updated' });
            // If no cars were found for update, respond with a 404 (Not found) status code and an error message
    }

    // Update the cars based on the filter criteria for owner
    const updatedOwner = await Car.updateMany(
      { owner: oldOwner },// Criteria for updating cars with the old owner value
      { $set: { owner: newOwner } },// Update operation: set the 'owner' field to the new owner value
      { new: true }// Options object: { new: true } returns the modified documents
    );

    if (updatedOwner.nModified === 0) {
        /*The nModified property checks represents the number of documents to be modified during the update.
           This condition checks if no documents were modified. */
      return res.status(404).json({ error: 'No car owner found to be updated' });
            // If no cars were found for update, respond with a 404 (Not found) status code and an error message
    }

    // Find and return the updated cars
      // the find method to retrieve the updated cars for each criteria 
    const updatedMakes = await Car.find({ make: newMake });//Find and return the updated car Make
    const updatedModels = await Car.find({ model: newModel });//find and return the updated carModel
    const updatedRegistrations = await Car.find({ registration: newRegistration });//Find and return the updated car registration
    const updatedOwners = await Car.find({ owner: newOwner });// Find and return the updated cars for owner

    // Respond with the updated documents
    res.json({ updatedOwners, updatedMakes, updatedRegistrations, updatedModels });
  } catch (error) {
    // Handle errors
    console.error('Error updating cars', error.message);
    res.status(500).send({ error: 'Internal server error' });
  }
};



