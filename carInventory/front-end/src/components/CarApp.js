import React, { useEffect, useState } from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Header from './components/Header';
import CarForm from './components/CarForm';
import UpdateForm from './components/UpdateForm';

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
  const [update, setUpdate] = useState(true);
  const [newMake, setNewMake] = useState('');
  const [newModel, setNewModel] = useState('');
  const [newRegistration, setNewRegistration] = useState('');
  const [newOwner, setNewOwner] = useState('');

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

  const removeCar = async (carId) => {
    try {
      const response = await fetch(`http://localhost:3001/removeById/${carId}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(carData),
      });

      if (!response.ok) {
        throw new Error('Failed to remove car');
      }

      const responseData = await response.json();
      console.log(responseData);
      setCars((prevCars) => prevCars.filter((car) => car._id !== carId));
      console.log('Car removed successfully');
    } catch (error) {
      setError('Error removing car', error);
      console.error('Error removing car:', error.message);
    }
  };

  const updateCarDetails = async (carData) => {
    try {
      const response = await fetch(`http://localhost:3001/updateByMake/${carData}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          make: newMake,
          model: newModel,
          registration: newRegistration,
          owner: newOwner,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update car details');
      }
    } catch (error) {
      setError('Error updating car details', error.message);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCarData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const updateCar = () => {
    setUpdate(!update);
  };

  return (
    <>
      <Container id='appContainer'>
        <Header />
        <section id='section1'>
          <form id='form' onSubmit={addCar}>
            <Row>
              <Col className='formCol'>
                          <CarForm carData={carData} handleInputChange={handleInputChange} addCar={addCar} />
        </section>
        <section id='section2'>
          <Row>
            <Col>
              <h2 className='h2'>Fetched Cars:</h2>
            </Col>
          </Row>
          {isLoaded ? (
            <ul id='list'>
              {cars.map((car) => (
                <li key={car._id} className='carsList'>
                  <Row id='row5'>
                    <Col className='carData'>
                      <label className='dataLabel'>MAKE:</label>
                      <p className='outputText'>{car.make} </p>
                    </Col>
                    <Col className='carData'>
                      <label className='dataLabel'>MODEL:</label>
                      <p className='outputText'>{car.model}</p>
                    </Col>
                    <Col>
                      <Button
                        variant="primary"
                        id='removeBtn'
                        onClick={() => removeCar(car._id)}
                      >
                        REMOVE CAR
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col className='carData'>
                      <label className='dataLabel'>REGISTRATION:</label>
                      <p className='outputText'>{car.registration}</p>
                    </Col>
                    <Col className='carData'>
                      <label className='dataLabel'>OWNER:</label>
                      <p className='outputText'>{car.owner}</p>
                    </Col>
                    <Col></Col>
                  </Row>
                  <Row>
                    <Col className='updateOpt'>
                      <Button variant="primary" onClick={updateCar}>
                        {update ? 'EXIT' : 'UPDATECAR'}
                      </Button>
                    </Col>
                  </Row>
                  <div className='update'>
                    {update && (
                      <UpdateForm
                        newMake={newMake}
                        setNewMake={setNewMake}
                        newModel={newModel}
                        setNewModel={setNewModel}
                        newRegistration={newRegistration}
                        setNewRegistration={setNewRegistration}
                        newOwner={newOwner}
                        setNewOwner={setNewOwner}
                        updateCarDetails={updateCarDetails}
                      />
                    )}
                  </div>
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
