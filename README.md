# LT8-Data-Interaction

## TABLE OF CONTENTS
1. [MONGODB](#mongodb)
2. [DEPENDENCIES](#dependencies)
3. [REFERENCES](#references)

## MONGODB

MongoDB is a NoSQL database and offers a scalable and adaptable way to store and retrieve data. MongoDB is used to store large amounts of data without 
any traditional relational database table. 
Instead of rows & columns, MongoDB used collections & documents to store data. A collections consist of a set of documents & a document consists 
of key-value pairs which are the basic unit of data in MongoDB.

![image](https://github.com/laraklopper/LT8-Data-Interaction/assets/135839853/4968fed4-e96e-4a9b-9633-64df6fd86512)

### HOW TO CONNECT A NODE APP TO MONGODB
To connect a Node.js application to MongoDB, use a library called Mongoose.  

```
const mongoose = require("mongoose");
```

```
mongoose.connect("mongodb://localhost:27017/collectionName", {
   useNewUrlParser: true,
   useUnifiedTopology: true
});
```
### 

### LINK TO MONGODB DATABASE

mongodb+srv://larak:<password>@cluster-one.0kjnxst.mongodb.net/

## DEPENDENCIES

- express
- mongoose
- cors
- body-parser
- nodemon
- dotenv

## REFERENCES
- https://www.npmjs.com/package/dotenv
- https://expressjs.com/en/resources/middleware.html
- https://www.javatpoint.com/mongodb-data-types
- https://www.geeksforgeeks.org/how-to-connect-node-js-to-a-mongodb-database/
- https://masteringjs.io/tutorials/mongoose/save
- https://www.tutorialspoint.com/mongodb/index.htm
