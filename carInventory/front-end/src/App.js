import React, { useEffect, useState } from 'react';// Import the React module to use React functionalities
import './App.css';//Import CSS File
import Header from './components/Header';//Import Header function component
import Form from './components/Form';//Import Form function component
import UpdateForm from './components/UpdateForm';//Import UpdateForm function component
import Container from 'react-bootstrap/Container';//Import Bootstrap Container
import Row from 'react-bootstrap/Row';//Import Bootstrap Row 
import Col from 'react-bootstrap/Col';//Import Bootstrap Colomn
import Button from 'react-bootstrap/Button';//Import Bootstrap button component


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
  const [update, setUpdate] = useState(false);//State to manage display of the update form 
  const [newMake, setNewMake] = useState('');//State to store updated car make
  const [newModel, setNewModel] = useState('');//state to store updated car model
  const [newRegistration, setNewRegistration] = useState('');// State to store updated car registration
  const [newOwner, setNewOwner] = useState('');// State to store updated car owner
  const [carToUpdate, setCarToUpdate] = useState(null);// Track the ID of the car for the update form



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
        // Handle errors during data fetching
        console.error('Error fetching data:', error.message);//Display error message in the console
        setError('Failed to fetch data');//Set an error message in the error state
        setIsLoaded(true);//Update the loading status to true
      }
    }

    // Invoke the fetchCars function
    fetchCars();
  }, []); // The empty dependency array ensures the effect runs only once on mount

  //============================FUNCTIONS TO HANDLE REQUESTS===============================
  //--------------------------POST REQUEST-------------------------------

  // Function to add a new car
  const addCar = async () => {//Define an async function to add a car 
    try {
      // Send a POST request to add a new car
      const response = await fetch('http://localhost:3001/addCar', {
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

      console.log('Car added successfully');//If the request is successful log a success message
    } 
    catch (error) {
      // Handle errors 
      console.error('Error adding car:', error.message);//Display error message in the console
    }
  };

  //---------------------PUT REQUESTS-------------------
  // Function to update car details
  const updateCarDetails = async (carData) => {//Define an async function to update car details
    try {
      //Send a request to the server
      const response = await fetch(`http://localhost:3001/updateById/${carData}`, {
        method: 'PUT',//Request method
        headers: {
          'Content-type': 'application/json',//Type of content being passed 
        },
        body: JSON.stringify({        // Convert the data to be updated into a JSON string
          make: newMake,// Updated car make
          model: newModel,// Updated car make
          registration: newRegistration,// Updated car registration
          owner: newOwner,// Updated car owner
        }
        )
      })

      //Conditional rendering to check if the response is successful
      if (!response.ok) {
        throw new Error('Failed to update car details')//Throw an error message if the request is unsuccessful
      }

      console.log('Car details successfully updated');// Log a success message if the update request is successful
    }
    catch (error) {
      //Error handling
      console.error('Error updating car', error.message);//Display error message in the console
      setError('Error updating car details', error.message);//Log errors during the update process
    }

  }

//-----------------DELETE REQUEST--------------------------
  //Function to remove a car
  const removeCar = async (carId) => {//Define an asynchronous function to remove a car from the list
    try {
      //Send delete request to server
      const response = await fetch(`http://localhost:3001/removeById/${carId}`, {
        method: 'DELETE',//Request method
        headers: {
          'Content-type': 'application/json',//Type of content being passed
        },
      });

      //Conditional rendering to check if the response is successful
      if (!response.ok) {
        throw new Error('Failed to add car');//Throw an error message if the request is unsuccessful
      }
  
      
      setCars((prevCars) => // Update the 'cars' state 
      //prevCars represents the previous state of the cars variable
          prevCars.filter((car) => car._id !== carId));//Filter out the array of cars
      console.log('Car removed successfully');//If the request is successful log a success message
    }
    catch (error) {
      setError('Error removing car', error)
      console.error('Error removing car:', error.message);//Display error message in the console
    }
  };

 
  //===============EVENT LISTENERS================= 
  // Function to handle input changes in the form
  const handleInputChange = (event) => {
    const { name, value } = event.target;  // Extract the name and value from the event target (input element)
  
    setCarData((prevData) => ({  // Update the carData state with the new input value
      ...prevData,  // Update the carData state using the previous state (prevData)
      // Spread the previous state to keep existing values

      [name]: value,    // Update the value of the specified input field
    }));
  };

  //Toggle function to update the car

  const updateCar = (carId) => {
    setUpdate(!update);    // Toggle the update state
    setCarToUpdate(carId);    // Set the carToUpdate state to the ID of the clicked car
  };

  //============JSX RENDERING=============

  return (
    <>
    {/* App Container */}
      <Container id='appContainer'>
        {/* Header */}
       <Header/>
        {/* section1 */}
        <section id='section1'>
          <Form
          carData={carData}
          handleInputChange={handleInputChange}
          addCar={addCar}
          />            
        </section>
        {/* section2 */}
          <section id='section2'>          
          {/* Display fetched cars */}
          {/* Row 4 */}
          <Row id='row4'>
            <Col>
              <h2 className='h2'>Fetched Cars:</h2>
            </Col>
          </Row>
          {/* Display output */}
            {isLoaded ? (
              <ul id='list'>                
                {/* Map through the fetched cars and display their details */}
                {cars.map((car) => (
                  <li 
                  key={car._id}
                  className='carsList'
                  >
                    {/* Row 5 */}
                    <Row id='row5'>
                      <Col className='carData'>
                        {/* car make */}
                        <label className='dataLabel'>MAKE:</label><p className='outputText'>{car.make} </p>
                        </Col>
                      <Col className='carData' >
                        {/* car model */}
                       <label className='dataLabel'>MODEL:</label><p className='outputText'>{car.model}</p>
                      </Col>
                      <Col>
                      
                      </Col>
                    </Row>
                      {/* Row 6 */}
                      <Row>
                      <Col className='carData'>
                        {/* Car registration */}
                        <label className='dataLabel'>REGISTRATION:</label><p className='outputText'>{car.registration}</p>
                      </Col>
                      <Col className='carData'>
                        {/* Car owner */}
                        <label className='dataLabel'>OWNER:</label><p className='outputText'>{car.owner}</p>
                      </Col>
                      <Col>
                      {/* Button to remove car from the list */}
                        <Button variant="primary" id='removeBtn'
                          onClick={() => {
                            removeCar(car._id);
                            // setUpdate(false);
                           }}
                        >
                          REMOVE CAR
                        </Button>
                      </Col>
                      </Row>
                    {/* Row 7 */}
                    <Row>
                      <Col className='updateOpt' >
                        {/* Button to toggle update form */}
                        <Button 
                          variant='primary' 
                          onClick={() => updateCar(car._id)}//Set the click event handler to call updateCar with the car ID
                          id='toggleUpdate'
                          >
                            {/* If in update mode for the current car, show 'EXIT UPDATE', else show 'UPDATE CAR' */}
                          {update && carToUpdate === car._id ? 'EXIT UPDATE' : 'UPDATE CAR'} 
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
                      ) }
                    </div>
                     
                    
                  </li>
                ))}
              </ul>
            ) : (
              <p>Loading...</p>
            )}
            {/* Display error if there's an issue with data fetching */}
            {error && <p>{error}</p>}
           
        </section>
      </Container>
    </>
  );
}
