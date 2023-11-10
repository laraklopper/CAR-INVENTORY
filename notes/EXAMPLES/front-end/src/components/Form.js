import React from 'react';// Import the React module to use React functionalities
import Row from 'react-bootstrap/Row';//Import Bootstrap Row 
import Col from 'react-bootstrap/Col';//Import Bootstrap Colomn
import Button from 'react-bootstrap/Button';//Import Bootstrap button component

//Form function component
export default function Form({//Export Default form function component
    //=======PROPS PASSED FROM THE PARENT COMPONENT==========
    carData, 
    handleInputChange, 
    addCar}) {

    //=======================JSX RENDERING===========
    
  return (
    // Form to add a car to the list
      <form id='form' onSubmit={addCar}>
          {/* Row 2 */}
          <Row className='formRow'>
              {/* Input field for car make */}
              <Col className='formCol'>
                {/* Input field for car Make */}
                  <label className='formLabel'>
                      <p className='labelText'>MAKE:</p>
                      <input
                          type='text'
                          className='formInput'
                          name='make'
                          value={carData.make}
                          onChange={handleInputChange}
                      />
                  </label>
              </Col>
              {/* Input field for car model */}
              <Col className='formCol'>
                  <label className='formLabel'>
                      <p className='labelText'>MODEL:</p>
                      <input
                          className='formInput'
                          type='text'
                          name='model'
                          value={carData.model}
                          onChange={handleInputChange}
                      />
                  </label>
              </Col>
        
          </Row>
          {/* Row3 */}
          <Row className='formRow'>
              {/* Input field for car Registration */}
              <Col className='formCol'>
                  <label className='formLabel'>
                      <p className='labelText'>REGISTRATION:</p>
                      <input
                          className='formInput'
                          type='text'
                          name='registration'
                          value={carData.registration}
                          onChange={handleInputChange}
                      />
                  </label>
              </Col>
              {/* Input field for car owner */}
              <Col className='formCol'>
                  <label className='formLabel'>
                      <p className='labelText'>OWNER:</p>
                      <input
                          className='formInput'
                          type='text'
                          name='owner'
                          value={carData.owner}
                          onChange={handleInputChange}
                      />
                  </label>
              </Col>
          </Row>
          {/* Row 4 */}
          <Row className='row3'>
              <Col className='col'>
                  {/* Button to add a new car */}
                  <Button variant="primary" id='submitBtn' type='submit'>ADD CAR</Button>
              </Col>
          </Row>
      </form> 
  )
}
