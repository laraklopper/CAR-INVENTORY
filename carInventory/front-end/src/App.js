import React, { useEffect, useState } from 'react';// Import the React module to use React functionalities
import './App.css';//Import CSS File

// App function component
export default function App() {//Export default App function component
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
    async function fetchCars() {//Define asynchronous function to fetch carData
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
        // Handle errors during data fetching
        console.error('Error fetching data:', error.message);//Display error message in the console
        setError('Failed to fetch data');//Set an error message in the error state
        setIsLoaded(true);//Update the loading status to true
      }
    }

    fetchCars(); // Invoke the fetchCars function
  }, []);// The empty dependency array ensures the effect runs only once on mount

      //============================FUNCTIONS TO HANDLE REQUESTS=============================== 
    //--------------------------POST REQUEST-------------------------------
//Function to add a new car
  const addCar = async () => {
    try {
      const response = await fetch('http://localhost:3001/addcar', {
        method: 'POST',//Request method
        headers: {
          'Content-type': 'application/json',//Type of content being passed
        },
        body: JSON.stringify(carData),// Convert carData to a JSON string and include it in the request body
      });

      //Conditional rendering to check if the response is successful
      if (!response.ok) {
        throw new Error('Failed to add car');//Throw an error message if the request is unsuccessful
      }

      console.log('Car added successfully');//If the request is successful log a success message in the console
    } 
    catch (error) {
        //Handle errors
      console.error('Error adding car:', error.message);//Display error message in the console
    }
  };

//---------------------PUT REQUEST-----------------------------------------
//Function to update a car
  const updateCar = async (carId) => {//Define an asynchronous function to edit car data
    try {
      const response = await fetch(`http://localhost:3001/updateCarById/${carId}`, {
        method: 'PUT',//Request method
        headers: {
          'Content-type': 'application/json',//Type of content being passed
        },
        body: JSON.stringify(carData),// Convert carData to a JSON string and include it in the request body
      });

    //Conditional rendering to check if the response is successful
      if (!response.ok) {
        throw new Error('Failed to add car');//Throw an error message if the request is unsuccessful
      }

      console.log('Car updated successfully');//If the request is successful log a success message in the console
    } 
    catch (error) {
        //Handle errors
      console.error('Error updating car', error.message);//Display error message in the console
    }
  };

    //--------------------DELETE REQUESTS---------------------
    //Function to remove a car
  const removeCar = async (carId) => {//Define an asynchronous function to remove a car from the list
    try {
        //Send request
      const response = await fetch(`http://localhost:3001/removeById/${carId}`, {
        method: 'DELETE',//Request method
        headers: {
          'Content-type': 'application/json',//Type of content being passed
        },
        body: JSON.stringify(carData),//Convert carData to a JSON string and include it in the request body
      });

     //Conditional rendering to check if the response is successful
      if (!response.ok) {
        throw new Error('Failed to add car');//Throw an error message if the request is unsuccessful
      }

      console.log('Car removed successfully');//If the request is successful log a success message
    } 
    catch (error) {
      console.error('Error removing car:', error.message);//Display error message in the console
    }
  };
    
//===================EVENT LISTENERS====================
     // Function to handle input changes in the form
  const handleInputChange = (event) => {
    const { name, value } = event.target; // Extract the name and value from the event target (input element)
    setCarData((prevData) => ({// Update the carData state with the new input value
        // Spread the previous state to keep existing values
      ...prevData,// Update the carData state using the previous state (prevData)
      [name]: value, // Update the value of the specified input field
    }));
  };

    //=================JSX RENDERING===================
  
    return (
    <>
  {/* App body */}
      <div id='appBody'>
      {/* Header */}
        <header id='header'>
          <h1>CARS</h1>
        </header>
      {/* section1 */}
        <section id='section1'>
          <form id='form' onSubmit={addCar}>
      {/* Input field for car make */}
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
            {/* Input field for car make */}
            <label className='label'>
              model
              <input
                type='text'
                name='model'
                value={carData.model}
                onChange={handleInputChange}
              />
            </label>
            {/* Input field for car registration */}
            <label className='label'>
              registration
              <input
                type='text'
                name='registration'
                value={carData.registration}
                onChange={handleInputChange}
              />
            </label>
            {/* Input field for car owner */}
            <label>
              owner
              <input
                type='text'
                name='owner'
                value={carData.owner}
                onChange={handleInputChange}
              />
            </label>
            {/* Button to add a new car */}
            <button type='submit' className='button'>
              ADD CAR
            </button>
          </form>
        </section>
             {/* section2 */}   
        <section id='section2'>
          {/* Display fetched cars */}
          <h2 className='h2'>Fetched Cars:</h2>
          {isLoaded ? (
            <ul>
          {/* Map through the fetched cars and display their details */}
              {cars.map((car) => (
                <li key={car._id}>
                  {car.make} {car.model} {car.registration} {car.owner}
                  <button onClick={() => updateCar(car._id)}>Update</button>
                  <button onClick={() => removeCar(car._id)}>DELETE</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>Loading...</p>
          )}
          {error && <p>{error}</p>}
        </section>
      </div>
    </>
  );
}
