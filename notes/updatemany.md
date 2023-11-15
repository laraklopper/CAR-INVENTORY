# UPDATEMANY 

## CONTROLLER
```
const Car = require('../models/carSchema');// Import the Car model representing the structure of the document in the MongoDB collection

// Function to update multiple cars
const updateMultipleCars = async (req, res) => {
  try {
    // Extract old and new values from the request body
    const oldOwner = req.body.owner;
    const newOwner = req.body.newOwner;

    console.log('Old Owner:', oldOwner);// Log extracted values for debugging purposes
    console.log('New Owner:', newOwner);// Log extracted values for debugging purposes

   // Update the cars based on the filter criteria
        const { nModified } = await Car.updateMany(
            { owner: oldOwner },
            { $set: { owner: newOwner } }
        );
    
        if (nModified === 0) {
            // If no cars were found for update, respond with a 404 status code and an error message
            return res.status(404).json({ error: 'No cars found for update' });
        }
    const updatedCars = await Car.find({ owner: newOwner });
    res.json(updatedCars);
  } catch (error) {
    console.error('Error updating cars', error.message);
    res.status(500).send({ error: 'Internal server error' });
  }
};

```


## REACT

```
const updateMultipleCars = async () => {//Define an async function to update multiple cars
  try {
    const response = await fetch('http://localhost:3001/updateMultipleCars', {
      // Send a PUT request to update multiple cars
      method: 'PUT',//Request method
      headers: {
        'Content-type': 'application/json',//Type of content being passed
      },
      body: JSON.stringify({// Convert the data to be updated into a JSON string
        owner: 'oldOwnerValue', 
        newOwner: 'newOwnerValue', 
      }),
    });

    //Conditional rendering to check if the response is successful
      if (!response.ok) {
        if (response.status === 404) { //Respond with a 404 status error
          throw new Error('No cars found for update');//Throw an error message no cars are found is unsuccessful
        } else {
          throw new Error('Failed to update car details');//Throw an error message if the request is unsuccessful
        }
      }

    const updatedCars = await response.json();
    console.log('Cars updated successfully', updatedCars);//If the request is successful log a success message and the updated cars
  }
catch (error) {
      //Handle errors
       console.error('Error updating cars:', error.message);//Log an error message in the console for debugging purposes.
      setError('Error updating cars:', error.message);//Log errors during the update process
  }
};
```
