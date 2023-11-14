import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Form from './components/Form';
import UpdateForm from './components/UpdateForm';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

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
  const [update, setUpdate] = useState(false);
  const [newMake, setNewMake] = useState('');
  const [newModel, setNewModel] = useState('');
  const [newRegistration, setNewRegistration] = useState('');
  const [newOwner, setNewOwner] = useState('');
  const [carToUpdate, setCarToUpdate] = useState(null);
  const [foundCars, setFoundCars] = useState([]);
  const [updateStatus, setUpdateStatus] = useState(null);

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
      setError('Error adding car:', error.message);
      return; // Stop further execution on error
    }
  };

  const findCars = async () => {
    try {
      const response = await fetch('http://localhost:3001/findByModel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(carData),
      });

      if (!response.ok) {
        throw new Error('Failed to find cars');
      }

      const data = await response.json();
      setFoundCars(data);
    } catch (error) {
      console.error('Error finding cars older than 5 years:', error.message);
      setError('Error finding cars older than 5 years', error.message);
    }
  };

  const updateCarDetails = async () => {
    try {
      const response = await fetch(`http://localhost:3001/updateById/${carToUpdate}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          ...(newMake && { make: newMake }),
          ...(newModel && { model: newModel }),
          ...(newRegistration && { registration: newRegistration }),
          ...(newOwner && { owner: newOwner }),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update car details');
      }

      setCars((prevCars) =>
        prevCars.map((car) =>
          car._id === carToUpdate
            ? {
                ...car,
                ...(newMake && { make: newMake }),
                ...(newModel && { model: newModel }),
                ...(newRegistration && { registration: newRegistration }),
                ...(newOwner && { owner: newOwner }),
              }
            : car
        )
      );

      setUpdate(false);
      setNewMake('');
      setNewModel('');
      setNewRegistration('');
      setNewOwner('');

      console.log('Car details successfully updated');
    } catch (error) {
      console.error('Error updating car', error.message);
      setError('Error updating car details', error.message);
    }
  };

  const updateMultipleCars = async () => {
    try {
      const response = await fetch('http://localhost:3001/updateMultipleCars', {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          owner: 'oldOwnerValue',
          newOwner: 'newOwnerValue',
          make: 'makeValue',
          newMake: 'newMakeValue',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update car details');
      }

      const updatedCars = await response.json();
      setUpdateStatus(updatedCars);
      console.log('Cars updated successfully');
    } catch (error) {
      console.error('Error updating cars:', error.message);
      setError('Error updating cars:', error.message);
    }
  };

  const removeCar = async (carId) => {
    try {
      const response = await fetch(`http://localhost:3001/removeById/${carId}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to remove car');
      }

      setCars((prevCars) =>
        prevCars.filter((car) => car._id !== carId)
      );
      console.log('Car removed successfully');
    } catch (error) {
      setError('Error removing car', error);
      console.error('Error removing car:', error.message);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setCarData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const updateCar = (carId) => {
    setUpdate(!update);
    setCarToUpdate(carId);
  };

  return (
    <>
      <Container id='appContainer'>
        <Header />
        <section id='section1'>
          <Form
            carData={carData}
            handleInputChange={handleInputChange}
            addCar={addCar}
          />
        </section>
        <section id='section2'>
          <Row id='row5'>
            <Col id='section2Heading'>
              <h2 className='h2'>Fetched Cars:</h2>
            </Col>
          </Row>
          <div>
            <Row>
              <Col>
                <Button onClick={updateMultipleCars}>UPDATE CARS</Button>
              </Col>
            </Row>
            <Row>
              <Col>
                {updateStatus && (
                  <div>
                    {updateStatus.error ? (
                      <p>Error: {updateStatus.error}</p>
                    ) : (
                      <p>Cars updated successfully</p>
                    )}
                  </div>
                )}
              </Col>
            </Row>
          </div>
          {isLoaded ? (
            <ul id='list'>
              {cars.map((car) => (
                <li key={car._id} className='carsList'>
                  <Row id='row6'>
                    <Col className='carData'>
                      <label className='dataLabel'>MAKE:</label>
                      <p className='outputText'>{car.make} </p>
                    </Col>
                    <Col className='carData'>
                      <label className='dataLabel'>MODEL:</label>
                      <p className='outputText'>{car.model}</p>
                    </Col>
                    <Col></Col>
                  </Row>
                  <Row id='row7'>
                    <Col className='carData'>
                      <label className='dataLabel'>REGISTRATION:</label>
                      <p className='outputText'>{car.registration}</p>
                    </Col>
                    <Col className='carData'>
                      <label className='dataLabel'>OWNER:</label>
                      <p className='outputText'>{car.owner}</p>
                    </Col>
                    <Col>
                      <Button
                        variant="primary"
                        id='removeBtn'
                        onClick={() => {
                          removeCar(car._id);
                        }}
                      >
                        REMOVE CAR
                      </Button>
                    </Col>
                  </Row>
                  <Row className='row8'>
                    <Col className='updateOpt'>
                      <Button
                        variant='primary'
                        onClick={() => updateCar(car._id)}
                        id='toggleUpdate'
                      >
                        {update && carToUpdate === car._id
                          ? 'EXIT UPDATE'
                          : 'UPDATE CAR'}
                      </Button>
                    </Col>
                  </Row>
                  <div className='update'>
                    {update && carToUpdate === car._id && (
                      <UpdateForm
                        newMake={newMake}
                        setNewMake={setNewMake}
                        newModel={newModel}
                        setNewModel={setNewModel}
                        newRegistration={newRegistration}
                        setNewRegistration={setNewRegistration}
                        newOwner={newOwner}
                        setNewOwner={setNewOwner}
                        updateCarDetails={() => updateCarDetails(car._id)}
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
        <section id='section3'>
          <Row>
            <Col>
              <h2 className='h2'>CARS OLDER THAN 5 YEARS</h2>
            </Col>
          </Row>
          <Row id='row12'>
            <Col></Col>
            <Col id='findCarsCol'>
              <Button variant='primary' onClick={findCars} id='findBtn'>
                DISPLAY
              </Button>
            </Col>
            <Col></Col>
          </Row>
          <ul>
            {foundCars.map((foundCar) => (
              <li className='carsList' key={foundCar._id}>
                <Row id='row13'>
                  <Col className='carData'>
                    <label className='dataLabel'>MAKE:</label>
                    <p className='outputText'>{foundCar.make} </p>
                  </Col>
                  <Col className='carData'>
                    <label className='dataLabel'>MODEL:</label>
                    <p className='outputText'>{foundCar.model}</p>
                  </Col>
                  <Col></Col>
                </Row>
                <Row className='row14'>
                  <Col className='carData'>
                    <label className='dataLabel'>REGISTRATION:</label>
                    <p className='outputText'>{foundCar.registration}</p>
                  </Col>
                  <Col className='carData'>
                    <label className='dataLabel'>OWNER:</label>
                    <p className='outputText'>{foundCar.owner}</p>
                  </Col>
                  <Col></Col>
                </Row>
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </>
  );
}
