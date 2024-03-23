import React from 'react';// Import the React module to use React functionalities
import Button from 'react-bootstrap/Button';//Import bootstrap button component
import Col from 'react-bootstrap/Col';//Import bootstrap Columns
import Row from 'react-bootstrap/Row';//Import bootstap Row

//UpdateForm function component
export default function UpdateForm({//Export default update form function component
  //=======PROPS PASSED FROM THE PARENT COMPONENT==========
  newMake,
  setNewMake, 
  newModel, 
  setNewModel, 
  newRegistration, 
  setNewRegistration, 
  newOwner, 
  setNewOwner, 
  updateCarDetails
  }) {


    //==================JSX RENDERING==================

  return (
    // Update form
          <form
          className='updateForm'
          onSubmit={(event) =>   
          {
            event.preventDefault(); // Prevent default form submission behavior
            updateCarDetails() // Call the updateCarDetails function
              }} 
              >
                {/* Row8 */}
            <Row id='row8'>
                  <Col className='updateCol'>
                    {/* Input field to update Car Make */}
                      <label className='updateLabel'>
                        <p className='labelText'>MAKE:</p>
                          <input
                              type='text'
                            onChange={(e) => setNewMake(e.target.value)}
                            name='newMake'
                            value={newMake}
                            className='changeInput'
                          />
                      </label>
                  </Col>
                  <Col className='updateCol'>
                    {/* Input field to update car registration */}
                      <label className='updateLabel'>
                  <p className='labelText'>REGISTRATION:</p>
                    <input 
                      type='text'
                      name='newRegistration'
                      onChange={(e) => setNewRegistration(e.target.value)}
                      value={newRegistration}
                      className='changeInput'        
                          />
                      </label>
                  </Col>
                  </Row>
                  {/* Row 9 */}
           <Row className='row' id='row9'>
            {/* Input field to update car model */}
                <Col className='updateCol'>
                <label className='updateLabel'>
                  <p className='labelText'>MODEL:</p>
                  <input
                    type='text'
                    onChange={(e) => setNewModel(e.target.value)}
                    value={newModel}
                    name='newModel'
                    className='changeInput'
                  />
                </label>

              </Col>
              <Col className='updateCol'>
                {/* Input field to update car owner */}
                <label className='updateLabel'>
                  <p className='labelText'>OWNER:</p>
                  <input
                    type='text'
                    onChange={(e) => setNewOwner(e.target.value)}
                    name='newOwner'
                    value={newOwner}
                    className='changeInput'
                  />
                </label>
              </Col>   
              
          </Row>
      {/* Row10 */}
          <Row>
              <Col className='updateBtnCol'>
                {/* Submit button to update car details */}
                  <Button type='submit' variant="success">
                    UPDATE CAR DETAILS</Button>                 
              </Col>
          </Row>
              </form>
     
    
  )
}
