# MONGOOSE
When working with the MongoDB driver, you are required to write a lot of boiler plate code (sections of code that has to be included in many places with little or no alteration). Mongoose is a library that sits on top of the MongoDB driver & abstracts some of the boilerplate code. It includes built-in typecasting, validation, query building and business logic hooks. Mongoose, therefore, makes it easier to write the code manipulating data in databases.

Mongoose is an Object Data Model ("ODM"). An ODM is a tool that allows the programmer to treat documents stored in databases as JavaScript objects.
## HOW TO USE MONGOOSE

### 1. INSTALL MONGOOSE
- Install mongoose in the command line interface in the Express.js(back-end/server-side) project directory:

  ```bash
   npm install mongoose
   ```

### 2. CREATE A SCHEMA
Although MongoDB is schemaless. Mongoose works with Schemas. A schema is the skeleton structure that represents the logical view of the entire database. 

```
const mongoose = require('mongoose');// Import the Mongoose library

//Define a new Schema for the database
let carsSchema = mongoose.Schema({
    make: {//Define a field for the car make
        type: String,
        required: true
    },
    model: {//Define a field for the car model
        type: String,
        required: true,
    },
    registration: {//Define a field for the car registration
        type: String,
        required: true,
    },
    owner:{//Define a field for the car owner
        type: String,
        required: true
    }
})

module.exports = mongoose.model('carInventory', carsSchema);//Make the model available outside the module
```
### 3. CREATE A CONTROLLER FILE TO PERFORM CRUD OPERATIONS

![image](https://github.com/laraklopper/LT8-Data-Interaction/assets/135839853/ff72194a-7b50-4c75-9881-b354f1b633fb)

In the project directory, create another directory called “controllers”. 
In this directory, create a file called controller.js. In this file, create all the code needed to perform CRUD operations using Mongoose.
```````
const Car = require('./carInventory/models/carSchema.js');
`````````

### CREATE (POST)
To create a document with Mongoose, use the `save() function`
``````
// Controller function to create a new car
const addCar = async function (req, res) {//Define an async function to add a new car 
    try {
        const newCar = new Car(req.body);// Create a new Car instance with the request body and save it to the database
        await newCar.save(); // Save the new car to the database

        res.status(201).json(newCar);// Respond with the newly created car and a 201 status code (Created)
    } 
    catch (error) {
        // Handle errors 
        console.error('Error adding the new car', error.message);//Log an error message in the console for debugging purposes.
        res.status(500).send('Internal server error');//Send a 500 status code and an error message
    }
};
``````
### READ (GET)
To read or query documents, use the `find() method`
``````
// Controller function to retrieve all cars
const findAllCars = async function (req, res) {//Define an aysnc function to fetch all cars from the database
    try {
        // Fetch all cars from the database based on any optional query parameters in req.body
        const cars = await Car.find(req.body);
        res.json(cars);// Respond with the list of cars
    }

    catch (error) {
        // Handle errors 
        console.error('Error fetching cars', error.message);//Log an error message in the console for debugging purposes.
        res.status(500).send('Internal server Error');//Send a 500 status code, and an error message
    }
};

```````
### UPDATE (PUT)
**UPDATE**
To update a document use the:
- `update() method`
- `updateOne() method`
- `updateMany()` or
- `findOneAndUpdate() method`
  
`````
// Controller function to update one single car by Id
const updateById = async (req, res) => {//Define an async function to update a single car by its id
    const { _id } = req.params;// Extract the 'make' parameter from the request URL

    try {
        // Find and update the car 
        const updatedCar = await Car.findByIdAndUpdate(
            _id,
            { $set: req.body }, // Update the car with the data in the request body
            { new: true } // Return the updated car instead of the original one
        );

        //Conditional rendering to check if the car is found
        if (!updatedCar) {
            return res.status(404).json('Car not found');//Respond with a 404 status code and a message indicating the car is not found
        }

        res.json(updatedCar);// Respond with the updated car
        console.log(updatedCar);//Log the updated car to the console

    }
    catch (error) {
        //Handle errors
        console.error('Error updating car', error.message);// Handle errors by logging the error,
        res.status(500).send('Internal server Error');// sending a 500 status code, and an error message
    }
};


``````

### DELETE (DELETE)
To delete a document, use the `remove() function`.
````
//Controller function to remove one car
const removeById = async (req, res) => {//Define an async function to remove a car from the database
    const  _id  = req.params._id;//Extract the Id parameter from the URL

    console.log(_id + "Remove by Id");
    try {
        //Find and remove a car
        const removedCar = await Car.findOneAndRemove({ _id });

        //Conditional rendering to check if the car is found
        if (!removedCar) {
            return res.status(404).json({ error: 'Car not found' })
        //Respond with a 404 status code and a message indicating the car is not found
        }

        res.json({ message: 'Car removed successfully' });//Respond with a JSON object containing a success message
    } 
    catch (error) {
        //Handle errors
        console.error('Error removing car', error.message); //Log error message in the console for debugging puposes
        res.status(500).send('Internal server Error');   // Handle errors during the removal process

    }
};
````
### EXPORT FUNCTIONS

```
// Export the functions so that they can be used in other parts of the application
module.exports = {
    addCar,
    findAllCars,
   updateById,
   removeById,
   findByModel,
   updateMultipleCars
};

```   
### 4. CONNECT TO THE DATABASE & EXECUTE THE APPROPRIATE CRUD OPERATIONS

Use the `mongoose.connect()` method to connect the database. The arguement passed into the connect() method is the connection string for the database.

````
mongoose.connect(uri, {
    useNewUrlParser: true,         // Use the new URL parser (recommended)
    useUnifiedTopology: true,    // Use the new Server Discover and Monitoring engine (recommended)
    dbName: database            // Specify the name of the MongoDB database
})
```````
## REFERENCES

- https://www.tutorialspoint.com/dbms/dbms_data_schemas.htm
- https://www.npmjs.com/package/mongoose?activeTab=readme 
