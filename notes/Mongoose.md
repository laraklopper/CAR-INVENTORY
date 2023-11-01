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

In the project directory, create another directory called “controllers”. 
In this directory, create a file called controller.js. In this file, create all the code needed to perform CRUD operations using Mongoose.
```````
const Car = require('./carInventory/models/carSchema.js');
`````````

 - **Create:**
To create a document with Mongoose, use the `save() function`
``````
exports.addCar = async function addCar(req, res) {
    try {
        const { make, model, registration, owner } = req.body;

        if (!make || !model || !registration || !owner) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const newCar = new Car({ make, model, registration, owner });

        await newCar.save();

        res.status(201).json(newCar);
    } catch (error) {
        console.error('Error adding car:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
``````
**READ**
To read or query documents, use the `find() method`
``````
exports.findAllCars = async function findAllCars(req, res) {
    try {
        const cars = await Car.find();

        res.status(200).json(cars);
    } catch (error) {
        console.error('Error retrieving cars:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
```````

**UPDATE**
To update a document use the:
- `update() method`
- `updateOne() method`
- `updateMany()` or
- `findOneAndUpdate() method`
  
`````
exports.updateByMake = async function updateByMake(req, res) {
    try {
        const makeToUpdate = req.params.make;

        const { model, registration, owner } = req.body;

        if (!model && !registration && !owner) {
            return res.status(400).json({ error: 'At least one field is required for update' });
        }
``````
**DELETE**
To delete a document, use the `remove() function`.
````
       const updatedCar = await Car.findOneAndUpdate(
            { make: makeToUpdate },
            { $set: { model, registration, owner } },
            { new: true }
        );

        if (!updatedCar) {
            return res.status(404).json({ error: 'Car not found' });
        }

        res.status(200).json(updatedCar);
    } catch (error) {
        console.error('Error updating car:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
````
   
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
