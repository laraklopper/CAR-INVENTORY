# REQUESTS


## POST REQUEST
```
  //--------------------------POST REQUEST-------------------------------

  // Function to add a new car
  const addCar = async () => {//Define an async function to add a car 
    try {
      // Send a POST request to add a new car
      const response = await fetch('http://localhost:3001/addCar', {
        method: 'POST',//Request method
        headers: {
          'Content-type': 'application/json',//Type of content being passed
        },
        body: JSON.stringify(carData),// Convert carData to a JSON string and include it in the request body
      });

      //Conditional rendering to check if the response is successful
      if (!response.ok) {
        throw new Error('Failed to add car');//Throw an error message if the request is unsuccessful
      }

      console.log('Car added successfully');//If the request is successful log a success message
    } 
    catch (error) {
      // Handle errors 
      console.error('Error adding car:', error.message);//Display error message in the console
    }
  };
```
## PUT REQUEST

````
//----------------------------PUT REQUEST--------------------------------  
const updateCarDetails = async () => {
  try {
     //Send a PUT request to the server
    const response = await fetch(`http://localhost:3001/updateById/${carToUpdate}`, {//Define an async function to update car details
      method: 'PUT',//Request method
      headers: {
        'Content-type': 'application/json',//Type of content being passed 
      },
      body: JSON.stringify({// Convert the data to be updated into a JSON string
        make: newMake,// Updated car make
        model: newModel,// Updated car make
        registration: newRegistration,// Updated car registration
        owner: newOwner,// Updated car owner
      }),
    });
     //Conditional rendering to check if the response is successful
      if (!response.ok) {
        throw new Error('Failed to update car details')//Throw an error message if the request is unsuccessful
      }

      // Update the local state with the modified car details
      setCars((prevCars) =>//setCars is used to update the state variable cars.
        prevCars.map((car) =>
          // Check if the current car's ID matches the ID of the car being updated (carToUpdate)
          car._id === carToUpdate
            ? {
                // If it's the car to update, create a new object with updated properties
                ...car, // Spread the existing properties of the car
                make: newMake, // Update the 'make' property with the new value
                model: newModel, // Update the 'model' property with the new value
                registration: newRegistration, // Update the 'registration' property with the new value
                owner: newOwner, // Update the 'owner' property with the new value
              }
            : car // If it's not the car to update, keep the current car object unchanged
        )
      );

    // Reset the update state and clear the update form
    setUpdate(false); //Set the update state to false.
    setNewMake(''); //Set the newMake state to an empty string ('').//Sets the newModel state to an empty string ('').
    setNewModel(''); // Set the newModel state to an empty string ('')
    setNewRegistration(''); // Set the newRegistration to an empty string ('')
    setNewOwner(''); //Set the newOwner state to an empty string ('').

    console.log('Car details successfully updated');// Log a success message if the update request is successful
  }
  catch (error) {
    //Handle errors
    console.error('Error updating car', error.message);//Display error message in the console
    setError('Error updating car details', error.message);//Log errors during the update process

  }
};

````
## DELETE REQUEST

```
//-----------------DELETE REQUEST--------------------------
  //Function to remove a car
  const removeCar = async (carId) => {//Define an asynchronous function to remove a car from the list
    try {
      //Send delete request to server
      const response = await fetch(`http://localhost:3001/removeById/${carId}`, {
        method: 'DELETE',//Request method
        headers: {
          'Content-type': 'application/json',//Type of content being passed
        },
      });

      //Conditional rendering to check if the response is successful
      if (!response.ok) {
        throw new Error('Failed to add car');//Throw an error message if the request is unsuccessful
      }
  
      
      setCars((prevCars) => // Update the 'cars' state 
      //prevCars represents the previous state of the cars variable
          prevCars.filter((car) => car._id !== carId));//Filter out the array of cars
      console.log('Car removed successfully');//If the request is successful log a success message
    }
    catch (error) {
      setError('Error removing car', error)
      console.error('Error removing car:', error.message);//Display error message in the console
    }
  };

```
