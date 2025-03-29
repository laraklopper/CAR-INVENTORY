# CAR INVENTORY
MongoDB database interaction task

LT8-Data-Interaction

## TABLE OF CONTENTS
1. [WHAT THE APPLICATION DOES](#what-the-application-does)
2. [HOW TO START THE PROGRAMME](#how-to-start-the-programme)
3. [MONGODDB](#mongodb)
4. [REFERENCES](#references)

## WHAT THE APPLICATION DOES
The application uses `mongoose` express.js middleware to connect to MongoDB to allow the user to retrieve a collection of documents about cars. It uses REST API requests to add, update and delete  a car to the collection, 
update a single car in the collection, update multiple cares in the collection and delete a document in the collection. The application also allows users to retrieve a List of the model, make, 
registration number, and current owner for all cars older than 5 years.

## HOW TO START THE PROGRAMME

To application uses `nodemon` express.js middleware to start the programme. To start the programme enter `npm start` in both the front and back end terminal/command line interface. 
```
npm install nodemon
```
## MONGODB

MongoDB is a NoSQL database and offers a scalable and adaptable way to store and retrieve data. MongoDB is used to store large amounts of data without 
any traditional relational database table. The data is stored as BSON. Instead of rows & columns, MongoDB used collections & documents to store data. 
A collection consist of a set of documents & a document consists 
of key-value pairs which are the basic unit of data in MongoDB.
### HOW TO CONNECT A NODE APP TO MONGODB
To connect a Node.js application to MongoDB, use a library called Mongoose.  

```
const mongoose = require("mongoose");
```
The `mongoose.connect()` method to connect the database. The arguement passed into the `connect()` method is the connection string for the database.
```
//==============CONNECT TO MONGODB===============
mongoose.Promise = global.Promise//use navtive promises
/*
Ensures Mongoose uses native JavaScript Promises for 
asynchronous operations instead of its deprecated promise library.
*/
mongoose.connect(uri, {
    //useNewUrlParser: true,// Use the new URL parser
    //useUnifiedTopology: true,// Use the new Server Discover and Monitoring engine
    dbName: database, // Specify the name of the MongoDB database
})
    .then(() => {//Execute when the connection is successful.
        console.log('Connected to MongoDB');//Log a success message when the connection is established.
    })
    .catch((err) => {//Execute if a connection error occurs
        console.error('Error connecting to MongoDB', err);//Log an error message if there's an issue connecting to MongoDB.
        process.exit(1);// Terminate the Node.js process with an exit code of 1, indicating an error
    });
```

```
// Function to establish connection to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(uri, {
            dbName: database, // Specify the database name
            serverSelectionTimeoutMS: 5000, // Timeout for selecting a server (5 sec)
            connectTimeoutMS: 10000, // Connection timeout (10 sec)
        });
        //Log a success message in the console for debugging purposes
        console.log("Successfully connected to MongoDB");
    } catch (error) {
        //Log an error message in the console for debugging purposes
        console.error("Error connecting to MongoDB database");
        process.exit(1); // Exit the process on failure
    }
};

```
```
//==================MONGODB EVENT HANDLERS=======================
// Set up an event listener for the 'error' event on the Mongoose connection
// Function executed when there is an error in the MongoDB connection
mongoose.connection.on('error', async (error) => {
    console.error('Could not connect to the database. Exiting now...', error);
    process.exit(1);
});
// Set up an event listener for the 'open' event on the Mongoose connection
// Function executed when the MongoDB connection is successfully open
mongoose.connection.once('open', async () => {
    console.log('Successfully connected to database');
});
/*
// Event: When the database gets disconnected
mongoose.connection.on('disconnected', () => {
    //Log a message to the console with the warning log level for debugging purposes
    console.warn('MongoDB disconnected. Reconnecting...');
    //connectDB(); // Attempt to reconnect automatically
});
// Event: When MongoDB successfully reconnects
mongoose.connection.on('reconnected', () => {
    //Log a success message in the console for debugging purposes
    console.log('MongoDB reconnected');
});
*/
```
### serverSelectionTimeoutMS

`serverSelectionTimeoutMS` controls how long the MongoDB Node.js driver will attempt to retry any operation before erroring out, including the initial connection, like `mongoose.connect()` and any operations
that make requests to MongoDB By default, serverSelectionTimeoutMS is 30000 (30 seconds). This means that, for example, if you call mongoose.connect() 
when your standalone MongoDB server is down, your mongoose.connect() call will only throw an error after 30 seconds.
### MONGOOSE CONNECTION EVENTS

| EVENT         | Exlanation                                      |  CODE                                          |
|---------------|-------------------------------------------------|------------------------------------------------|
|'error'        |If an error occurs while connecting to MongoDB   | mongoose.connection.on('error', () => {        |
|'disconnected' |When the database gets disconnected              | mongoose.connection.on('disconnected', () => {   |
|'reconnected'  |When MongoDB successfully reconnects             | mongoose.connection.on('reconnected', () => {  |
|'open'         |when the MongoDB connection is successfully open | mongoose.connection.once('open', () => {       |


## REFERENCES
- https://www.npmjs.com/package/dotenv
- https://expressjs.com/en/resources/middleware.html
- https://www.javatpoint.com/mongodb-data-types
- https://www.geeksforgeeks.org/how-to-connect-node-js-to-a-mongodb-database/
- https://masteringjs.io/tutorials/mongoose/save
- https://www.tutorialspoint.com/mongodb/index.htm
- https://www.mongodb.com/docs/manual/introduction/
- https://mongoosejs.com/docs/connections.html
