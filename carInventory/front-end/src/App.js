import React, { useEffect, useState } from 'react';// Import the React module to use React functionalities

//App function component
export default function App() {
  //------------STATE VARIABLES-----------------
  const [carData, setCarData] = useState({// State to manage the form data for adding a new car
    make: '',
    model: '',
    registration: '',
    owner: '',
  });
  const [error, setError] = useState(null);// State to handle errors during data fetching or car addition
  const [isLoaded, setIsLoaded] = useState(false);// State to track whether the data has been loaded
  const [cars, setCars] = useState([]);

    //===================FETCH JSON DATA=====================
  // useEffect hook to fetch the list of cars when the component mounts
  useEffect(() => {
    async function fetchCars() {
      try {
        //Fethc the data from the server
        const response = await fetch('http://localhost:3001/findAllCars');
       
        // Conditional rendering to check if the response is successful
        if (!response.ok) {
          throw new Error('Failed to fetch data');//Throw an error message if the request is unsuccessful
        }

        const data = await response.json();
        setCars(data);
        setIsLoaded(true);
      } 
      catch (error) {
       // Handle errors during data fetching
        console.error('Error fetching data:', error.message);
        setError('Failed to fetch data');
        setIsLoaded(true);
      }
    }

    fetchCars();
  }, []);

 //============================FUNCTIONS TO HANDLE REQUESTS=============================== 
  const addCar = async () => {
    try {
     // Send a POST request to add a new car
      const response = await fetch('http://localhost:3001/addCar', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(carData),
      });
      //Conditional rendering to check if the response is successful

      if (!response.ok) {
        throw new Error('Failed to add car');
      }

      console.log('Car added successfully');
    } 
    catch (error) {
      console.error('Error adding car:', error.message);
    }
  };
  
  //===============FUNCTIONS================= 
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCarData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

//======================JSX RENDERING======================
  
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

