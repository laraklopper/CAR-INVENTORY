# CAR INVENTORY
MongoDB database interaction task

LT8-Data-Interaction

## TABLE OF CONTENTS
1. [WHAT THE APPLICATION DOES](#what-the-application-does)
2. [HOW TO START THE PROGRAMME](#how-to-start-the-programme)
3. [REFERENCES](#references)

## WHAT THE APPLICATION DOES
The application uses `mongoose` express.js middleware to connect to MongoDB to allow the user to retrieve a collection of documents about cars. It uses REST API requests to add, update and delete  a car to the collection, 
update a single car in the collection, update multiple cares in the collection and delete a document in the collection. The application also allows users to retrieve a List of the model, make, 
registration number, and current owner for all cars older than 5 years.

## HOW TO START THE PROGRAMME

To application uses `nodemon` express.js middleware to start the programme. To start the programme enter `npm start` in both the front and back end terminal/command line interface. 

### MONGODB

MongoDB is a NoSQL database and offers a scalable and adaptable way to store and retrieve data. MongoDB is used to store large amounts of data without 
any traditional relational database table. The data is stored as BSON. Instead of rows & columns, MongoDB used collections & documents to store data. 
A collection consist of a set of documents & a document consists 
of key-value pairs which are the basic unit of data in MongoDB.

## REFERENCES
- https://www.npmjs.com/package/dotenv
- https://expressjs.com/en/resources/middleware.html
- https://www.javatpoint.com/mongodb-data-types
- https://www.geeksforgeeks.org/how-to-connect-node-js-to-a-mongodb-database/
- https://masteringjs.io/tutorials/mongoose/save
- https://www.tutorialspoint.com/mongodb/index.htm
