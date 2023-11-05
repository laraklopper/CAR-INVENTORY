import React from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

export default function UpdateForm() {
  return (

          <form
       //   onSubmit={updateCarDetails}
          >
            
                  <Col>
                      <label className=''>
                        <p className='labelText'>MAKE:</p>
                          <input
                              type='text'
                            // onChange={(e) => setNewMake(e.target.value)}
                            // value={newMake}
                            className='changeInput'
                          />
                      </label>
                  </Col>
                  <Col>
                      <label className='label'>
                  <p className='labelText'>REGISTRATION:</p>
                    <input 
                      type='text'
                    //   onChange={(e) => setNewRegistration(e.target.value)}
                    //   value={newRegistration}/
                      className='changeInput'        
                          />
                      </label>
                  </Col>
    
                  <Col>
                  <label className='updateLabel'>
                      <p className='labelText'>MODEL:</p>
                      <input
                        type='text'
                        // onChange={(e) => setNewModel(e.target.value)}
                        // value={newModel}
                        className='changeInput'
                         />
                  </label>
                  
                  </Col>
                  <Col>
                  <label className='updateLabel'>
                      <p className='labelText'>OWNER:</p>
                      <input 
                      type='text'
                      //onChange={(e) => setNewOwner(e.target.value)}
                    //  value={newOwner}
                      className='changeInput'
                      
                      />
                  </label>
                  </Col>
                
              <Col>
                  <Button type='submit' variant="success">UPDATE CAR DETAILS</Button>

              </Col>
              </form>
     
    
  )
}


