# CODE

## TABLE OF CONTENTS
1. [FRONTEND](#frontend)
2. [BACKEND](#backend)
3. [SCHEMA](#schema)

## FRONTEND
### App.js (React Frontend):

```jsx
import React, { useEffect, useState } from 'react';
import './App.css';

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
      const response = await fetch('http://localhost:3001/addcar', {
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

  const updateCar = async (carId) => {
    try {
      const response = await fetch(`http://localhost:3001/updateCarById/${carId}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(carData),
      });

      if (!response.ok) {
        throw new Error('Failed to update car');
      }

      console.log('Car updated successfully');
    } catch (error) {
      console.error('Error updating car', error.message);
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

      console.log('Car removed successfully');
    } catch (error) {
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
        </section>
        <section id='section2'>
          <h2 className='h2'>Fetched Cars:</h2>
          {isLoaded ? (
            <ul>
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

```
## BACKEND
### app.js (Express Backend):

```javascript
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const carController = require('./controllers/carControllers');
require('dotenv').config();

const database = process.env.DATABASE_NAME;
const uri = process.env.DATABASE_URL;
const app = express();
const port = process.env.PORT || 3001;

if (!port) {
  console.error('Error: PORT environment variable is missing');
  process.exit(1);
}

if (!database) {
  console.error('Error: DATABASE_NAME environment variable is missing');
  process.exit(1);
}

if (!uri) {
  console.error('Error: DATABASE_URL environment variable is missing');
  process.exit(1);
}

mongoose.Promise = global.Promise;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: database,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err)

 => {
    console.error('Error connecting to MongoDB', err);
  });

mongoose.connection.on('error', function (error) {
  console.log('Could not connect to the database. Exiting now...', error);
  process.exit(1);
});

mongoose.connection.once('open', function () {
  console.log('Successfully connected to database');
});

app.use(express.json());
app.use(cors());

app.post('/addCar', carController.addCar);
app.get('/findAllCars', carController.findAllCars);
app.put('/updateCarById/:make', carController.updateById);
app.delete('/removeById', carController.removeById);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
```

### carController.js:

```javascript
const Car = require('../models/Car');

exports.addCar = async (req, res) => {
  try {
    const { make, model, registration, owner } = req.body;
    const newCar = new Car({ make, model, registration, owner });
    const savedCar = await newCar.save();
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    console.error('Error adding car:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.findAllCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    console.error('Error fetching cars:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateById = async (req, res) => {
  try {
    const { make } = req.body;
    const { id } = req.params;
    await Car.findByIdAndUpdate(id, { make });
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    console.error('Error updating car:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.removeById = async (req, res) => {
  try {
    const { id } = req.body;
    await Car.findByIdAndRemove(id);
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    console.error('Error removing car:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
```
## SCHEMA
### Car.js (Model):

```javascript
const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
  },
  registration: {
    type: String,
  },
  owner: {
    type: String,
  },
});

module.exports = mongoose.model('Car', carSchema);
```

