import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const CarForm = ({ carData, handleInputChange, addCar }) => {
  return (
    <form id='form' onSubmit={addCar}>
      <Row>
        <Col className='formCol'>
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
      <Row>
        <Col className='col'>
          <Button variant="primary" id='submitBtn' type='submit'>
            ADD CAR
          </Button>
        </Col>
      </Row>
    </form>
  );
};

export default CarForm;
