import React, { useEffect, useState } from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Header from './components/Header';
import Button from 'react-bootstrap/Button';

//App function component
export default function App() {
  const [carData, setCarData] = useState({
    make: '',
    model: '',
    registration: '',
    owner: '',
  });

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [cars, setCars] = useState([]);
  const [newMake, setNewMake] = useState('');
  const [newModel, setNewModel] = useState('');
  const [newRegistration, setNewRegistration] = useState('');
  const [newOwner, setNewOwner] = useState('');
 const [update, setUpdate] = useState(false);

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await fetch('http://localhost:3001/findAllCars');

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setCars(data);
        setIsLoaded(true);
      } catch (error) {
        console.error('Error fetching data:', error.message);
        setError('Failed to fetch data');
        setIsLoaded(true);
      }
    }

    fetchCars();
  }, []);

  const addCar = async () => {
    try {
      const response = await fetch('http://localhost:3001/addCar', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(carData),
      });

      if (!response.ok) {
        throw new Error('Failed to add car');
      }

      console.log('Car added successfully');
    } catch (error) {
      console.error('Error adding car:', error.message);
    }
  };

  const updateCarMake = async (carId, newMake) => {
    try {
      const response = await fetch(`http://localhost:3001/updateByMake/${carId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/JSON',
        },
        body: JSON.stringify({
          newMake: newMake,
        }),
      });

      if (!response.ok) {
        throw new Error('Error updating the car make');
      }

      setCars((prevCars) =>
        prevCars.map((car) =>
          car._id === carId ? { ...car, make: newMake } : car
        )
      );
    } catch (error) {
      console.error('Error updating car make', error.message);
    }
  };

  const removeCar = async (carId) => {
    try {
      const response = await fetch(`http://localhost:3001/removeCarById/${carId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error removing car');
      }

      const responseData = await response.json();
      console.log(responseData);
      setCars((prevCars) => prevCars.filter((car) => car._id !== carId));
      console.log('Car removed successfully');
    } catch (error) {
      setError('Error removing car', error.message);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCarData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

//==============JSX Rendering===========

  return (
    <>
      <Container>
          {/* Header */}
         <Header/>
         {/* section1 */}
        <section id='section1'>
          <form id='form' onSubmit={addCar}>
            {/* Row 2 */}
            <Row>
            {/* Input field for car make */}
            <Col  className='formCol'>
            
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
            <Col md={3} className='formCol'>            
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
            {/* Input field for car registration */}
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
          <Col  className='formCol'>
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
          {/* Row 3 */}
          <Row>
            <Col className='col'>
                {/* Button to add a new car */}
                <Button variant="primary" id='submitBtn' type='submit'>ADD CAR</Button>
            </Col>
          </Row>
          </form>         
        </section>
        {/* section2 */}
        <section id='section2'>
          {/* Display fetched cars */}
          {/* Row 4 */}
          <Row>
            <Col>
              <h2 className='h2'>Fetched Cars:</h2>
            </Col>
          </Row>
 {/* Row 5 */}
        <Row>
          {isLoaded ? (
            <ul>
              {cars.map((car) => (
                <li key={car._id} className='carsList'>
                  <label className='dataLabel'>MAKE:</label>
                  {car.make}
                  <input
                    type='text'
                    onChange={(e) => setNewMake(e.target.value)}
                    value={newMake}
                    className='changeInput'
                  />
                  <label className='dataLabel'>MODEL:</label>
                  {car.model}
                  <input
                    type='text'
                    onChange={(e) => setNewModel(e.target.value)}
                    value={newModel}
                    className='changeInput'
                  /><br />
                  <label className='dataLabel'>REGISTRATION:</label>
                  {car.registration}
                  <button>
                    Update
                  </button>
                  <input
                    type='text'
                    onChange={(e) => setNewRegistration(e.target.value)}
                    value={newRegistration}
                    className='changeInput'
                  /><br />
                  <label>OWNER:</label>
                  {car.owner}
                  
                  <input
                    type='text'
                    onChange={(e) => setNewOwner(e.target.value)}
                    value={newOwner}
                    className='changeInput'
                  /><br />
                  <button onClick={() => removeCar(car._id)}>REMOVE CAR</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>Loading...</p>
          )}
          {error && <p>{error}</p>}
        </section>
      </Container>
    </>
  );
}
