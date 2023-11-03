import React, { useEffect, useState } from 'react';// Import the React module to use React functionalities
import './App.css';//Import CSS File
import { updateById } from '../../controllers/carControllers';

//App function component
export default function App() {
    //==============STATE VARIABLES=================
  const [carData, setCarData] = useState({// State to manage the form data for adding a new car
    make: '',
    model: '',
    registration: '',
    owner: '',
  });
  const [error, setError] = useState(null);// State to handle errors during data fetching or car addition
  const [isLoaded, setIsLoaded] = useState(false);// State to track whether the data has been loaded
  const [cars, setCars] = useState([]);// State to store the fetched list of cars

  
  //===================FETCH JSON DATA=====================
  // useEffect hook to fetch the list of cars when the component mounts
  useEffect(() => {
    async function fetchCars() {//Define asynchronous function to fetch data
      try {
        // Fetch data from the server
        const response = await fetch('http://localhost:3001/findAllCars');

       // Conditional rendering to check if the response is successful
        if (!response.ok) {
          throw new Error('Failed to fetch data');//Throw an error message if the request is unsuccessful
        }
        
        const data = await response.json();// Parse the response data and update the state
        setCars(data);//Update the state variable cars with the parsed data 
        setIsLoaded(true);//Update the loading status to true
      } 
      catch (error) {
        console.error('Error fetching data:', error.message);//Display error message in the console
        setError('Failed to fetch data');//Set an error message in the error state
        setIsLoaded(true);//Update the loading status to true
      }
    }

    fetchCars();//Call the fetchCars function
  }, []);// The empty dependency array ensures the effect runs only once on mount

  //=================REQUEST FUNCTIONS=================
  // Function to add a new car
  const addCar = async () => {
    try {
      // Send a POST request to the server
      const response = await fetch('http://localhost:3001/addcar', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',//Type of content being passed
        },
        body: JSON.stringify(carData),//Convert to JSON data
      });
    
      //Conditional rendering to check if the response is successful
      if (!response.ok) {
        throw new Error('Failed to add car');//Throw an error message if the request is unsuccessful
      }

      console.log('Car added successfully');
    } catch (error) {
      //Handle errors
      console.error('Error adding car:', error.message);//Display an error message in the console
    }
  };

   //===============FUNCTIONS================= 
  // Function to handle input changes in the form
  const handleInputChange = (event) => {
    const { name, value } = event.target;// Extract the name and value from the event target (input element)
    
    setCarData((prevData) => ({  // Update the carData  state variable  with the new input value

      ...prevData, // Update the carData state using the previous state (prevData)
      //The spread operator (...) is used to create a shallow copy of the previous state.
      [name]: value,// Update the value of the specified input field
    }));
  };

  //=====================JSX RENDERING=========================
  
  return (
    <>
      <div id='appBody'>
        <header id='header'>
          <h1>CARS</h1>
        </header>
        <section id='section1'>
          <form id='form' onSubmit={addCar}>
            <label className='label'>
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
            <label className='label'>
              registration
              <input
                type='text'
                name='registration'
                value={carData.registration}
                onChange={handleInputChange}
              />
            </label>
            <label>
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

          <div>
            <h2 className='h2'>Fetched Cars:</h2>
            {isLoaded ? (
              <ul>
                {cars.map((car) => (
                  <li key={car._id}>
                    {car.make} {car.model} {car.registration} {car.owner}
                    <button onClick={() => updateById(car._id)}>Update</button>
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
