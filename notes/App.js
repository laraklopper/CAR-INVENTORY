import React, { useEffect, useState } from 'react';// Import the React module to use React functionalities
import './App.css';//Import CSS File
import Header from './components/Header';//Import Header function component
import Form from './components/Form';//Import Form function component
import UpdateForm from './components/UpdateForm';//Import UpdateForm function component
import Container from 'react-bootstrap/Container';//Import Bootstrap Container
import Row from 'react-bootstrap/Row';//Import Bootstrap Row 
import Col from 'react-bootstrap/Col';//Import Bootstrap Colomn
import Button from 'react-bootstrap/Button';//Import Bootstrap button component

//App function component
export default function App() {//Export default app function component
  //=============STATE VARIABLES======================
  const [carData, setCarData] = useState({//State to manage form data for adding a new car
    make: '',
    model: '',
    registration: '',
    owner: '',
  });
  const [error, setError] = useState(null);//State to handle errors during fetching data or car addition
  const [isLoaded, setIsLoaded] = useState(false);//State to track whether data has been loaded
  const [cars, setCars] = useState([]);//State to store the list of fetched cars
  const [update, setUpdate] = useState(false);//state to manage the update form
  const [newMake, setNewMake] = useState('');//State to store the update car make
  const [newModel, setNewModel] = useState('');//State to store the updated car model
  const [newRegistration, setNewRegistration] = useState('');//state to store the updated car registration
  const [newOwner, setNewOwner] = useState('');//State to store the updated car owner
  const [carToUpdate, setCarToUpdate] = useState(null);//State to track the Id of the Car for the update form
  const [foundCars, setFoundCars] = useState([]);//State to store cars older than 5 years

    //===================FETCH JSON DATA=====================
  // useEffect hook to fetch the list of cars when the component mounts
  useEffect(() => {
    async function fetchCars() {//Define asynchronous function to fetch data
      try {
        //Fetch data from the server
        const response = await fetch('http://localhost:3001/findAllCars');

        // Conditional rendering to check if the response is successful
        if (!response.ok) {
          throw new Error('Failed to fetch data');//Throw an error message if the request is unsuccessful
        }

        const data = await response.json();//Parse the response data and update the state
        setCars(data);//Update the state variable cars with the parsed data 
        setIsLoaded(true);//Update the loading status to true
      } 
      catch (error) {
      // Handle errors 
        console.error('Error fetching data:', error.message);//Display error message in the console for debugging purposes
        setError('Failed to fetch data');//Set an error message in the error state
        setIsLoaded(true);//Update the loading status to true
      }
    }
    
// Invoke the fetchCars function
    fetchCars();
  }, [carData]);


  //============================FUNCTIONS TO HANDLE REQUESTS===============================
  //--------------------------POST REQUEST-------------------------------
  // Function to add a new car 
  const addCar = async () => {//Define an async function to add a car
    try {
      //Send a POST request to the server
      const response = await fetch('http://localhost:3001/addCar', {
        method: 'POST',//Request method
        headers: {
          'Content-type': 'application/json',//Type of content being passed
        },
        body: JSON.stringify(carData),//Convert carData to a JSON string and include it in the request body
      });

      //Conditional rendering to check if the response is successful
      if (!response.ok) {
        throw new Error('Failed to add car');//Throw an error message if the POST request is unsuccessful
      }

      console.log('Car added successfully');//Display a success messge in the console the request POST request is successful 
    } 
    catch (error) {
      //Handle errors
      console.error('Error adding car:', error.message);//Display error message in the console for debugging purposes
      setError('Error adding car: ' + error.message);//Log errors during the request process
    }
  };

  //Function to find cars older than 5 years
  const findCars = async () => {//Define an async function to find all cars older than 5 years
    try {
      //Send a POST request to the server
      const response = await fetch('http://localhost:3001/findByModel', {
        method: 'POST',//Request method
        headers: {
          'Content-Type': 'application/json',//Type of content being passed
        },
        body: JSON.stringify(carData),//Convert the carData to a JSON string and include it in the request body
      });

      //Conditional rendering to check if the response is successful
      if (!response.ok) {
        throw new Error('Failed to find cars');//Throw an error message if the POST request is unsuccessful
      }

      const data = await response.json();// Parse the response and set the found cars
      setFoundCars(data); // Update state with the fetched data
    } 
    catch (error) {
      //Handle errors
      console.error('Error finding cars older than 5 years:', error.message);//Display error in console for debugging purposes
      setError('Error finding cars older than 5 years: ' + error.message);//Log errors during the request process
    }
  };
  
//--------------------PUT REQUESTS----------------------------
  //Function to update details for a single car
  const updateCarDetails = async () => {//Define an async function to update car details
    try {
      //Send a PUT request to the server
      const response = await fetch(`http://localhost:3001/updateById/${carToUpdate}`, {
        method: 'PUT',//Request method
        headers: {
          'Content-type': 'application/json',//Type of content being passed
        },
        body: JSON.stringify({//Convert the data to be updated into a JSON string
          //Include the field values with the new values and leave the rest unchanged
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

      //Update the local state with modified car details
      setCars((prevCars) =>
        prevCars.map((car) =>
          //Conditional rendering to check if the current car's ID matches the ID of the car being updated
          car._id === carToUpdate
          //If the car ID matches the car to be updated, create a new object with updated properties 
            ? {
                ...car,
              //Update only the fields with new values leave the rest unchanged
                ...(newMake && { make: newMake }),//Logic to check the newMake
                ...(newModel && { model: newModel }),//Logic to check the newModel
                ...(newRegistration && { registration: newRegistration }),//Logic to check the newRegistration
                ...(newOwner && { owner: newOwner }),//Logic to check the new owner
              }
            : car
        )
      );

      //Reset the update stat and clear the update form
      setUpdate(false);//Hide the update form
      setCarData({
        make: '',
        model: '',
        registration: '',
        owner: '',
      });
      console.log('Car details successfully updated');// Log a success message if the PUT request is successful
    } 
    catch (error) {
      //Handle errors
      console.error('Error updating car details:', error.message);//Display error message in the console for debugging purposes
      setError('Error updating car details: ' + error.message);//Log errors during the update process
    }
  };

//Function to update details for multiple cars
  const updateMultipleCars = async () => {//Define an async function to update multiple car details
    try {
      const response = await fetch('http://localhost:3001/updateMultipleCars', {
        method: 'PUT',//Request method
        headers: {
          'Content-type': 'application/json',//Convert the data to be updated into a JSON string
        },
        body: JSON.stringify({// Convert the data to be updated into a JSON string
          owner: 'oldOwner',
          newOwner: 'newOwner',
        }),
      });

      //Conditional rendering to check if the response is successful
      if (!response.ok) {
        if (response.status === 404) //Respond with a 404 status error
        { 
          throw new Error('No cars found for update');//Throw an error message no cars are found 
        } 
        else {
          throw new Error('Failed to update car details');//Throw an error message if the PUT request is unsuccessful
        }
      }

      const updatedCars = await response.json();
      console.log('Cars updated successfully', updatedCars);//If the request is successful log a success message 
    } 
    catch (error) {
      console.error('Error updating cars:', error.message);
      setError('Error updating cars: ' + error.message);
    }
  };

  //-----------------DELETE REQUEST--------------------------
    //Function to remove a car
  const removeCar = async (carId) => {//Define an async funtion to remove a car from the list
    try {
        //Send a DELETE request to server
      const response = await fetch(`http://localhost:3001/removeById/${carId}`, {//Define an asynchronous function to remove a car from the list
        method: 'DELETE',//Request method
        headers: {
          'Content-type': 'application/json',//Type of content being passed
        },
      });

      //Conditional rendering to check if the response is successful
      if (!response.ok) {
        throw new Error('Failed to remove car');//Throw an error message if the DELETE request is unsuccessful
      }

      setCars((prevCars) =>//Update the 'cars' state
        //prevCars represents the previous state of the cars variable
        prevCars.filter((car) => car._id !== carId);//Filter out the array of cars
      );
      console.log('Car removed successfully');//If the DELETE request is successful log a message in the console
    } catch (error) {
      setError('Error removing car: ' + error.message);//Log errors during the update process
      console.error('Error removing car:', error.message);//Display error message in the console for debugging purposes
    }
  };

    //===============EVENT LISTENERS================= 
 // Function to handle input changes in the form
  const handleInputChange = (event) => {
    const { name, value } = event.target;// Extract the name and value from the event target (input element)
    setCarData((prevData) => ({
      ...prevData,//Update the carData state with the new input value
            // Spread the previous state to keep existing values
      [name]: value,//Update the value of the specified input field
    }));
  };

//Toggle function to update the car
  const updateCar = (carId) => {
    setUpdate(!update);//Toggle the update state
    setCarToUpdate(carId);//Set the carToUpdate state to the ID of the clicked car
  };

    //============JSX RENDERING============= 

  
  return (
    <>
    {/* App Container */}
      <Container id="appContainer">
    {/* Header */}
        <Header />
    {/* Section1 */}
        <section id="section1">
    {/* Render form component */}
          <Form
            carData={carData}
            handleInputChange={handleInputChange}
            addCar={addCar}
          />
        </section>
              {/* Section 2 */}
        <section id="section2">
          {/* Display fetched cars */}
          {/* Row 5 */}
          <Row id="row5">
            <Col id="section2Heading">
              <h2 className="h2">Fetched Cars:</h2>
            </Col>
          </Row>
          <div>
            {/* Update multiple cars form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateMultipleCars();
              }}
            >
              <Row>
                <Col>
                  <label>
                    <p>NEW OWNER:</p>
                    <input
                      type="text"
                      name="newOwner"
                      value={newOwner}
                      onChange={handleInputChange}
                    />
                  </label>

                  <Button type="submit" variant="primary">
                    UPDATE MULTIPLE CARS
                  </Button>
                </Col>
              </Row>
            </form>
          </div>
           {/* Display output */}
          {isLoaded ? (
            <ul id="list">
            {/* Map through the fetched cars and display their details */}
              {cars.map((car) => (
                <li key={car._id} className="carsList">
                  <Row id="row6">
                    <Col className="carData">
                       {/* car make */}    
                      <label className="dataLabel">MAKE:</label>
                      <p className="outputText">{car.make} </p>
                    </Col>
                    <Col className="carData">
                      {/* car model */}
                      <label className="dataLabel">MODEL:</label>
                      <p className="outputText">{car.model}</p>
                    </Col>
                    <Col></Col>
                  </Row>
           {/*Row 7*/}
                  <Row id="row7">
                    <Col className="carData">
                    {/* Car registration */}
                      <label className="dataLabel">REGISTRATION:</label>
                      <p className="outputText">{car.registration}</p>
                    </Col>
                    <Col className="carData">
                    {/* Car owner */}
                        <label className='dataLabel'>OWNER:</label>
                        <p className='outputText'>{car.owner}</p>
                    </Col>
                    <Col>
                    {/* Button to remove car from the list */}
                      <Button
                        variant="primary"
                        id="removeBtn"
                        onClick={() => {
                          removeCar(car._id);
                        }}
                      >
                        REMOVE CAR
                      </Button>
                    </Col>
                  </Row>
                    {/* Row 8 */}
                  <Row className="row8">
                    <Col className="updateOpt">
                    {/* Button to toggle update form */}
                      <Button
                        variant="primary"
                        onClick={() => updateCar(car._id)}
                        id="toggleUpdate"
                      >
                    {/* If in update mode for the current car, show 'EXIT UPDATE', else show 'UPDATE CAR' */}
                        {update && carToUpdate === car._id
                          ? 'EXIT UPDATE'
                          : 'UPDATE CAR'}
                      </Button>
                    </Col>
                  </Row>
                  <div className="update">
                        {/* Display the update car form */}
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
            {/* Display error if there's an issue with data fetching */}
          {error && <p>{error}</p>}
        </section>
        {/* Section 3 */}
        <section id="section3">
          <Row>
            <Col>
              <h2 className="h2">CARS OLDER THAN 5 YEARS</h2>
            </Col>
          </Row>
          <Row id="row12">
            <Col></Col>
            <Col id="findCarsCol">
            {/* Button to display cars older than 5 years */}
              <Button variant="primary" onClick={findCars} id="findBtn">
                DISPLAY
              </Button>
            </Col>
            <Col></Col>
          </Row>
          <ul>
            {/* Map through cars older than 5 years and display the details */}
            {foundCars.map((foundCar) => (
              <li className="carsList" key={foundCar._id}>
                <Row id="row13">
                  <Col className="carData">
                    <label className="dataLabel">MAKE:</label>
                    <p className="outputText">{foundCar.make} </p>
                  </Col>
                  <Col className="carData">
                    <label className="dataLabel">MODEL:</label>
                    <p className="outputText">{foundCar.model}</p>
                  </Col>
                  <Col></Col>
                </Row>
                <Row className="row14">
                  <Col className="carData">
                    <label className="dataLabel">REGISTRATION:</label>
                    <p className="outputText">{foundCar.registration}</p>
                  </Col>
                  <Col className="carData">
                    <label className="dataLabel">OWNER:</label>
                    <p className="outputText">{foundCar.owner}</p>
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
