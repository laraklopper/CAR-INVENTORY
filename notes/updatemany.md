# UPDATEMANY 

## CONTROLLER
```
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

        // Log extracted values for debugging purposes
        console.log('Old Make:', oldMake);
        console.log('New Make:', newMake);
        console.log('Old Model:', oldModel);
        console.log('New Model:', newModel);
        console.log('Old Registration:', oldRegistration);
        console.log('New Registration:', newRegistration);
        console.log('Old Owner:', oldOwner);
        console.log('New Owner:', newOwner);

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

        // Check if any cars were found and updated
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
```


## REACT

```
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

const UpdateCarsComponent = () => {
  // State to manage the input values
  const [updateData, setUpdateData] = useState({
    make: '',
    newMake: '',
    model: '',
    newModel: '',
    registration: '',
    newRegistration: '',
    owner: '',
    newOwner: '',
  });

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  /// Function to trigger the updateMultipleCars function on the server
  const handleUpdateCars = async () => {
    try {
      const response = await fetch('http://localhost:3001/updateMultipleCars', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        throw new Error('Failed to update cars');
      }

      // Handle success if needed
      console.log('Cars updated successfully');
    } catch (error) {
      // Handle errors
      console.error('Error updating cars:', error.message);
    }
  };

  return (
    <div>
      {/* Render input fields */}
      <input type="text" name="make" value={updateData.make} onChange={handleInputChange} />
      <input type="text" name="newMake" value={updateData.newMake} onChange={handleInputChange} />
      {/* Add more input fields for other properties as needed */}
      
      {/* Button to trigger the update */}
      <Button variant="primary" onClick={handleUpdateCars}>
        Update Cars
      </Button>
    </div>
  );
};

export default UpdateCarsComponent;

```
