import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/esm/Button';

export default function UpdateMultiple() {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const updateMultipleCars = async () => {
    try {
      // Make an HTTP POST request to your server endpoint
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
    <form
          onSubmit={updateMultipleCars}
    > 
          <Row>
              <Col>
              <label>
                  <p className='labelText'>MAKE:</p>
                  <input
                  type='text'
                  name='make'
                  value={updateData.make}
                  onChange={handleInputChange}
                  />
              </label>
              </Col>
              <Col>
              <label>
                  <p className='labelText'>MODEL:</p>
                  <input 
                  type='text'
                  name='model'
                  value={updateData.model}
                  onChange={handleInputChange}
                  />
              </label></Col>
              <Col></Col>
          </Row>
          <Row>
              <Col>
              <label>
                  <p className='labelText'>REGISTRATION:</p>
                  <input
                  type='text'
                  name='registration'
                  value={updateData.registration}
                  onChange={handleInputChange}
                  />
              </label>
              </Col>
              <Col>
              <label>
                  <p className='labelText'>OWNER:</p>
                  <input
                  type='text'
                  name='owner'
                  value={updateData.owner}
                  onChange={handleInputChange}                   
                  />
              </label>
              </Col>
              <Col> 
              <Button 
                variant='primary'
                type='submit'
                > 
                    UPDATE MULTIPLE CARS:
                </Button>
                </Col>
          </Row>
    </form>
  )
}
