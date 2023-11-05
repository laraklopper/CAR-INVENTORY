import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

//UpdateForm function component
export default function UpdateForm() {//Export default update form function component
    const [newMake, setNewMake] = useState('');
    const [newModel, setNewModel] = useState('');
    const [newRegistration, setNewRegistration] = useState('');
    const [newOwner, setNewOwner] = useState('');

    //==================JSX RENDERING==================
  return (
          <form
          className='updateForm'
        //   onSubmit={(event) => { event.preventDefault(); updateCarDetails() }
                    >
            <Row>
            
                  <Col className='updateCol'>
                      <label className=''>
                        <p className='labelText'>MAKE:</p>
                          <input
                              type='text'
                            onChange={(e) => setNewMake(e.target.value)}
                            value={newMake}
                            className='changeInput'
                          />
                      </label>
                  </Col>
                  <Col className='updateCol'>
                      <label className='label'>
                  <p className='labelText'>REGISTRATION:</p>
                    <input 
                      type='text'
                      onChange={(e) => setNewRegistration(e.target.value)}
                      value={newRegistration}
                      className='changeInput'        
                          />
                      </label>
                  </Col>
    
                  <Col className='updateCol'>
                  <label className='updateLabel'>
                      <p className='labelText'>MODEL:</p>
                      <input
                        type='text'
                        onChange={(e) => setNewModel(e.target.value)}
                        value={newModel}
                        className='changeInput'
                         />
                  </label>
                  
                  </Col>
                  <Col className='updateCol'>
                  <label className='updateLabel'>
                      <p className='labelText'>OWNER:</p>
                      <input 
                      type='text'
                      onChange={(e) => setNewOwner(e.target.value)}
                     value={newOwner}
                      className='changeInput'                      
                      />
                  </label>
                  </Col>        
          </Row>
          <Row>
              <Col>
                  <Button type='submit' variant="success">UPDATE CAR DETAILS</Button>

              </Col>
          </Row>
              </form>
     
    
  )
}
