# UPDATE MULTIPLE CARS

## CONTROLLER FUNCTION
### UPDATE MANY
`````
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
        await Car.updateMany( //Criteria for car make
            { make: oldMake },
            { $set: { make: newMake } }
        );
        await Car.updateMany(//Criteria for car model
            { model: oldModel },
            { $set: { model: newModel } }
        );
        await Car.updateMany(//Criteria for car registration
            { registration: oldRegistration },
            { $set: { registration: newRegistration } }
        );
        await Car.updateMany(//Criteria for car owner
            { owner: oldOwner },
            { $set: { owner: newOwner } }
        );

        // Find and return the updated cars
        const updatedCars = await Car.find({
            make: newMake,
            model: newModel,
            registration: newRegistration,
            owner: newOwner
        });
        res.json(updatedCars);
    }
   catch (error) {
        //Handle errors during the database query or processing
        console.error('Error updating cars', error.message);//Log error message in the console for debugging puposes
        res.status(500).send({ error: 'Internal server error' });// Respond with a 500 (Internal Server Error) status code and an error message
    }
};
module.exports ={
  updateMultipleCars
}
````````
### $replaceAll (aggregation) 
```


```
## REACT REQUEST
```
  //Function to update the details of multiple cars
  const updateMultipleCars = async () => {//Define an async function to update multiple car details
    try {

      // Send a PUT request to update multiple cars
      const response = await fetch('http://localhost:3001/updateMultipleCars', {
        method: 'PUT',//Request method
        headers: {
          'Content-type': 'application/json',//Type of content being passed
        },
        body: JSON.stringify({ // Convert the data to be updated into a JSON string
          oldOwner: 'oldOwner',
          newOwner: 'newOwner',
          oldMake: 'oldMake',
          newMake: 'newMake',
          oldRegistration: 'oldRegistration',
          newRegistration: 'newRegistration',
          oldModel: 'oldModel',
          newModel: 'newModel'        
        
        }),
      });

      //Conditional rendering to check if the response is successful
      if (!response.ok) {
        if (response.status === 404) //Respond with a 404 (Not found) status error
        { 
          throw new Error('No cars found for update');//Throw an error message no cars are found 
        } 
        else {
          throw new Error('Failed to update car details');//Throw an error message if the PUT request is unsuccessful
        }
      }
    

      const updatedCars =await response.json();
      console.log('Cars updated successfully', updatedCars);//If the request is successful log a success message 
    } catch (error) {
      //Handle errors
      console.error('Error updating cars:', error.message);//Log an error message in the console for debugging purposes.
      setError('Error updating cars:', error.message);//Log errors during the update process
    }
  };
  ```
## REACT FORM
```
import React from 'react'
import Row from 'react-bootstrap/Row';//Import Bootstrap Row 
import Col from 'react-bootstrap/Col';//Import Bootstrap Colomn
import Button from 'react-bootstrap/Button';//Import Bootstrap button component

//UpdateMultiple function component
export default function UpdateMultiple({updateMultipleCars},{formData}, {handleInputChange}) {

    //============JSX RENDERING==================
  return (
      <form onSubmit={updateMultipleCars}>
          <Row className='formRow'>
              <Col className='formCol'>
                  <label className='formLabel'><p className='labelText'>UPDATE MAKE:</p>
                      <input
                          type='text'
                          className='formInput'
                          onChange={handleInputChange}
                          value={formData.newMake}
                      />
                  </label>
              </Col>
              <Col className='formCol'>
                  <label className='formLabel'><p className='labelText'>UPDATE MODEL:</p>
                      <input
                          type='text'
                          className='formInput'
                          onChange={handleInputChange}
                          value={formData.newOwner}
                          name='oldOwner'
                      />
                  </label>
              </Col>
          </Row>
          <Row className='formRow'>
              <Col className='formCol'>
                  <label className='formLabel'><p className='labelText'>UPDATE REGISTRATION:</p>
                      <input
                          type='text'
                          className='formInput'
                          name='oldRegistration'
                          onChange={handleInputChange}
                          value={formData.newRegistration}
                      />
                  </label>
              </Col>
              <Col className='formCol'>
                  <label className='formLabel'><p className='labelText'>UPDATE OWNER</p>
                      <input
                          type='text'
                          className='formInput'
                          onChange={handleInputChange}
                          value={formData.newOwner}
                          name='oldOwner' />
                  </label>
              </Col>
          </Row>
          <Row className='formRow'>
              <Col className='formCol'>
                  <Button variant='primary' type='submit' id='updateMany'>
                      UPDATE MULTIPLE CARS
                  </Button>
              </Col>
          </Row>
      </form>
  )
}

```
