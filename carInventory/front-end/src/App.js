import React, { useEffect, useState } from 'react';

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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCarData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <div id='appBody'>
        <header id="header">
          <h1 className="h1">CARS</h1>
        </header>
        <section id="section1">
          <form onSubmit={addCar} id="form">
            <label className="label">
              make
              <input
                type='text'
                className='input'
                name='make'
                value={carData.make}
                onChange={handleInputChange}
              />
            </label>
            <label className='label'>
              model
              <input
                type='text'
                name='model'
                value={carData.model}
                onChange={handleInputChange}
              />
            </label>
            <label className="label">
              registration
              <input
                type='text'
                name='registration'
                value={carData.registration}
                onChange={handleInputChange}
              />
            </label>
            <label className="label">
              owner
              <input
                type='text'
                name='owner'
                value={carData.owner}
                onChange={handleInputChange}
              />
            </label>
            <button type='submit' className='button'>
              ADD CAR
            </button>
          </form>
        </section>
        <section id="section2">
          <div>
            <h2 className="h2">Fetched Cars:</h2>
            {isLoaded ? (
              <ul>
                {cars.map((car) => (
                  <li key={car._id}>
                    {car.make} - {car.model} - {car.registration} - {car.owner}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Loading...</p>
            )}
            {error && <p>{error}</p>}
          </div>
        </section>
      </div>
    </>
  );
}

