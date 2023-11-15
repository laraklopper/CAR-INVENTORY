# UPDATEMANY 

## CONTROLLER
```
const Car = require('../models/carSchema');// Import the Car model representing the structure of the document in the MongoDB collection

// Function to update multiple cars
const updateMultipleCars = async (req, res) => {
  try {
    const oldOwner = req.body.owner;
    const newOwner = req.body.newOwner;

    console.log('Old Owner:', oldOwner);
    console.log('New Owner:', newOwner);

    const updateResult = await Car.updateMany(
      { owner: oldOwner },
      { $set: { owner: newOwner } }
    );

    if (updateResult.nModified === 0) {
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
const updateMultipleCars = async () => {
  try {
    const response = await fetch('http://localhost:3001/updateMultipleCars', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        owner: 'oldOwnerValue', // Replace with dynamic value
        newOwner: 'newOwnerValue', // Replace with dynamic value
      }),
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('No cars found for update');
      } else {
        throw new Error('Failed to update car details');
      }
    }

    const updatedCars = await response.json();
    console.log('Cars updated successfully', updatedCars);
  } catch (error) {
    console.error('Error updating cars:', error.message);
    // Assuming setError is a function to handle errors in your application state
    setError('Error updating cars: ' + error.message);
  }
};
```
