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
export default function App() {//Export defaualt app function component
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
  const [foundCars, setFoundCars] = useState([]);//State to store cars older than 5 years
  const [selectedCars, setSelectedCars] = useState([]);//State to store selected cars

    //===================FETCH JSON DATA=====================
  // useEffect to fetch cars when the component mounts
  useEffect(() => {
    async function fetchCars() {//Define asynchronous function to fetch data
      try {
        // Fetch data from the server
        const response = await fetch('http://localhost:3001/findAllCars');
       
        // Conditional rendering to check if the response is successful
        if (!response.ok) {
          throw new Error('Failed to fetch data');//Throw an error message if the request is unsuccessful
        }

        // Parse the response and set component state
        const data = await response.json();// Parse the response data and update the state
        setCars(data);//Update the state variable cars with the parsed data 
        setIsLoaded(true);//Update the loading status to true
      } 
      catch (error) {
        // Handle errors during data fetching
        console.error('Error fetching data:', error.message);//Display error message in the console for debugging purposes
        setError('Failed to fetch data');//Set an error message in the error state
        setIsLoaded(true);//Update the loading status to true
      }
    }

    // Invoke the fetchCars function when the component mounts
    fetchCars();
  }, []);// The empty dependency array ensures the effect runs only once on mount

  
  //============================FUNCTIONS TO HANDLE REQUESTS===============================
  //--------------------------POST REQUEST-------------------------------
  // Function to add a new car
  const addCar = async () => {//Define asynchronous function to add a car
    try {
      // Send a POST request to add a new car
      const response = await fetch('http://localhost:3001/addCar', {
        method: 'POST',//Request method
        headers: {
          'Content-type': 'application/json',//Type of content being passed
        },
        body: JSON.stringify(carData),// Convert data to a JSON string and include it in the request body
      });

      //Conditional rendering to check if the response is successful
      if (!response.ok) {
        throw new Error('Failed to add car');//Throw an error message if the request is unsuccessful
      }
      
      console.log('Car added successfully');//Display a success messge in the console the request POST request is successful 
    } 
    catch (error) {
      // Error handling
      console.error('Error adding car:', error.message);//Display error message in the console for debugging purposes
      setError('Error adding car:', error.message);//Log errors during the request process
    }
  };

  // Function to find cars based on model
  const findCars = async () => {//Define an async function to find all cars older than 5 years
    try {
      // Send a POST request to find cars by model
      const response = await fetch('http://localhost:3001/findByModel', {
        method: 'POST',//Request method
        headers: {
          'Content-Type': 'application/json',//Type of content being passed
        },
        body: JSON.stringify(carData),// Convert carData to a JSON string and include it in the request body
      });

        //Conditional rendering to check if the response is successful
      if (!response.ok) {
        throw new Error('Failed to add find cars');//Throw an error message if the request is unsuccessful
      }

      const data = await response.json();  // Parse the response and set the found cars
      setFoundCars(data); // Update state with the fetched data
    } 
    catch (error) {
      // Handle errors
      console.error('Error finding cars older than 5 years:', error.message);//Display error in console for debugging purposes
      setError('Error finding cars older than 5 years', error.message);//Log errors during the request process
    }
  };

    //---------------------PUT REQUESTS-------------------
  // Function to update details of a single car
  const updateCarDetails = async () => {//Define an async function to update car details
    try {
      // Send a PUT request to update car details by ID
      const response = await fetch(`http://localhost:3001/updateById/${carToUpdate}`, {
        method: 'PUT',//Request method
        headers: {
          'Content-type': 'application/json',//Type of content being passed
        },
        body: JSON.stringify({// Convert the data to be updated into a JSON string
          // Include fields with new values and keep the rest unchanged
          ...(newMake && { make: newMake }),
          ...(newModel && { model: newModel }),
          ...(newRegistration && { registration: newRegistration }),
          ...(newOwner && { owner: newOwner }),
        }),
      });
      
    //Conditional rendering to check if the response is successful
      if (!response.ok) {
        throw new Error('Failed to update car details')//Throw an error message if the request is unsuccessful
      }
   

      // Update component state with the updated car details
      setCars((prevCars) =>
        prevCars.map((car) =>
          // Conditional rendering to check if the current car's ID matches the ID of the car being updated (carToUpdate)
          car._id === carToUpdate
                      // If it's the car to update, create a new object with updated properties

            ? {...car,
               // Update only the fields with new values, keep the rest unchanged
              ...(newMake && { make: newMake }),//Logic to check the newMake
              ...(newModel && { model: newModel }),//Logic to check the newModel
              ...(newRegistration && { registration: newRegistration }),//Logic to check the newRegistration
              ...(newOwner && { owner: newOwner }),//Logic to check the newOwner
              }
            : car // If it's not the car to update, keep the current car object unchanged     
        )
      );

      // Reset update-related state variables
      setUpdate(false);// Hide the update form
      setNewMake(''); // Clear the newMake input field
      setNewModel(''); // Clear the newModel input field
      setNewRegistration(''); // Clear the newRegistration input field
      setNewOwner(''); // Clear the newOwner input field

      console.log('Car details successfully updated');// Log a success message if the update request is successful
    } 
    catch (error) {
      // Handle errors during car update
      console.error('Error updating car', error.message);
      setError('Error updating car details', error.message);
    }
  };

  // Function to update details of multiple cars
  const updateMultipleCars = async () => {//Define an async function to update multiple cars
    try {
      // Get selected car IDs
      const selectedCarIds = selectedCars;

          // Conditional rendering to check if no cars are selected for update
      if (selectedCarIds.length === 0) {
        console.log('No cars selected for update');
        return;
      }

      // Data for updating multiple cars
      const updatedData = {
        make: newMake,
        model: newModel,
        registration: newRegistration,
        owner: newOwner,
      };

      // Send a PUT request to update multiple cars
      const response = await fetch('http://localhost:3001/updateMultipleCars', {
        method: 'PUT',//Request method
        headers: {
          'Content-type': 'application/json',//Type of content being passed
        },
        body: JSON.stringify({// Convert the data to be updated into a JSON string
          carIds: selectedCarIds,
          updatedData,
        }),
      });

      //Conditional rendering to check if the response is successful
      if (!response.ok) {
        throw new Error('Failed to update car details')//Throw an error message if the request is unsuccessful
      }

      console.log('Cars updated successfully');//If the request is successful log a success message 
    } 
    catch (error) {
      // Handle errors 
     console.error('Error updating cars:', error.message);//Log an error message in the console for debugging purposes.
      setError('Error updating cars:', error.message);//Log errors during the update process
    }
  };

//------------------------------DELETE REQUEST------------------------------------------
  // Function to remove a car by ID
  const removeCar = async (carId) => {
    try {
      // Send a DELETE request to remove a car by ID
      const response = await fetch(`http://localhost:3001/removeById/${carId}`, {
        method: 'DELETE',//Request method
        headers: {
          'Content-type': 'application/json',//Type of content being passed
        },
      });

            //Conditional rendering to check if the response is successful
      if (!response.ok) {
        throw new Error('Failed to remove car');//Throw an error message if the request is unsuccessful
      }

      
      setCars((prevCars) =>// Update the 'cars' state 
        //prevCars represents the previous state of the cars variable
        prevCars.filter((car) => car._id !== carId)//Filter out the array of cars
      );
      console.log('Car removed successfully');//If the request is successful log a success message
    } catch (error) {
      // Handle errors during car removal
      setError('Error removing car', error);//Log errors during the update process
      console.error('Error removing car:', error.message);//Display error message in the console for debugging purposes
    }
  };

  //========================FUNCTIONS=====================
  // Function to handle input changes in the form
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Update carData state based on the input changes
    setCarData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to toggle the update mode and select/deselect cars for update
  const updateCar = (carId) => {
    if (selectedCars.includes(carId)) {
      // Deselect the car if already selected
      setSelectedCars(selectedCars.filter((id) => id !== carId));
    } 
    else {
      // Select the car if not already selected
      setSelectedCars([...selectedCars, carId]);
    }

    // Toggle the update mode and set the car to update
    setUpdate(!update);
    setCarToUpdate(carId);
  };

    //============JSX RENDERING=============


  return (
    <>
        {/* App Container */}
      <Container id='appContainer'>
            {/* Header */}
        <Header />
            {/* section1 */}
        <section id='section1'>
          {/* Render the Form component */}
          <Form
            carData={carData}
            handleInputChange={handleInputChange}
            addCar={addCar}
          />
        </section>
        {/* section2 */}
        <section id='section2'>
          {/* Display fetched cars */}
          {/* Row 5 */}
          <Row id='row5'>
            <Col id='section2Heading'>          
              <h2 className='h2'>Fetched Cars:</h2>
            </Col>
          </Row>
          <Row>
            <Col>
              {/* Button to update multiple cars */}
              <Button variant='primary' onClick={updateMultipleCars}>
                UPDATE MULTIPLE CARS ({selectedCars.length} selected)
              </Button>
            </Col>
          </Row>
          {isLoaded ? (
            <ul id='list'>
              {/* Map through the fetched cars and render details */}
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
                      {/* Button to remove a car */}
                      <Button
                        variant='primary'
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
                      {/* Button to toggle update mode */}
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
                    {/* Render the UpdateForm component when in update mode */}
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
              {/* Button to find cars older than 5 years */}
              <Button variant='primary' onClick={findCars} id='findBtn'>
                DISPLAY
              </Button>
            </Col>
            <Col></Col>
          </Row>
          <ul>
            {/* Map through found cars and render details */}
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
