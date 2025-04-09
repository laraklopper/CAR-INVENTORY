# MONGOOSE CONNECTION METHODS

You can connect to MongoDB using `mongoose.connect()` method.

## TABLE OF CONTENTS

1. [MINIMUM CONNECTION METHOD](#minimum-connection-method)
2. [CONNECTION FUNCTIONS](#connection-functions)
3. [CONNECTION EVENTS](#connection-events)

## MINIMUM CONNECTION METHOD

```
//mongoose.Promise = global.Promise; // Use native promises

mongoose.connect(uri, {
 dbName: database,  // Specify the database name
})
    .then(() => {
        console.log('Connected to MongoDB');//Log a success message in the console for debugging purposes
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB', err);//Log an error message for debugging purposes
        process.exit(1); // Exit the process with a failure code
    })


```

## CONNECTION FUNCTIONS

```
mongoose.Promise = global.Promise;// Set Mongoose to use native JavaScript Promises

/*Define an asynchronous function to connect to 
MongoDB using Mongoose */
const connectDB = async (re) => {
    try {
        await mongoose.connect(uri, {
            dbName: database,// Specify the database name to connect to
            serverSelectionTimeoutMS: 5000,// Fail connection if server is not found within 5 seconds
            connectTimeoutMS: 10000,
        })
        console.log("Successfully connected to MongoDB");
        
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
        process.exit(1)
    }
}
```

```
// Function to establish MongoDB connection with retry mechanism
const connectDB = async (retryCount = 5, delay = 5000) => {
    for (let attempt = 1; attempt <= retryCount; attempt++) {
        try {
            await mongoose.connect(uri, {
                dbName: database,
                serverSelectionTimeoutMS: 5000,
                connectTimeoutMS: 10000,
            });
            console.log("Successfully connected to MongoDB");
            return;
        } catch (error) {
            console.error(`MongoDB connection attempt ${attempt} failed:`, error.message);
            if (attempt < retryCount) {
                console.log(`Retrying in ${delay / 1000} seconds...`);
                await new Promise(resolve => setTimeout(resolve, delay));
            } else {
                console.error("Failed to connect to MongoDB after multiple attempts. Exiting.");
                process.exit(1);
            }
        }
    }
};

```
### CONNECTION OPTIONS 
When calling mongoose.connect(), you can pass various options to configure the behaviour of the connection.
---


| **Option**                   | **Description**                                                                 |
|-----------------------------|---------------------------------------------------------------------------------|
| `dbName`                    | Name of the database to connect to                                             |
| `user`, `pass`              | Username/password for authentication                                           |
| `authSource`                | Database to authenticate against                                               |
| `useNewUrlParser`           | Use new URL parser (true by default since Mongoose 6)                         |
| `useUnifiedTopology`        | Use the MongoDB driver’s unified topology layer (true by default)             |
| `serverSelectionTimeoutMS`  | How long to wait before failing server selection                               |
| `connectTimeoutMS`          | Max time (ms) to wait for a connection to be established                       |
| `socketTimeoutMS`           | Max time (ms) to wait for I/O operations on a socket                           |
| `autoIndex`                 | Automatically build indexes defined in schemas                                 |
| `ssl` / `tls`               | Use SSL/TLS connection                                                         |
| `family`                    | Force IPv4 or IPv6: `4`, `6`, or `undefined` for auto                          |
| `replicaSet`                | Name of the replica set to connect to                                          |
| `retryWrites`               | Retry write operations if they fail temporarily                                |
| `maxPoolSize`               | Max number of sockets the MongoDB driver will keep open for this connection    |
| `minPoolSize`               | Minimum number of sockets in the pool                                          |
| `keepAlive`                 | Keep the connection alive via TCP keep-alive packets                           |

---
## CONNECTION EVENTS 
Mongoose provides event hooks on the mongoose.connection object to help you monitor and handle the status of your MongoDB connection in real-time.

```
const mongoose = require('mongoose');

// Event listener triggered on initial connection to the MongoDB server
mongoose.connection.on('connected', () => {
  console.log('MongoDB connection established');
});

// Event listener triggered once when the connection is successfully opened
mongoose.connection.once('open', () => {
  console.log('MongoDB connection open');
});

// Event listener triggered when the MongoDB connection is lost
mongoose.connection.on('disconnected', () => {
  console.warn('MongoDB disconnected! Attempting to reconnect...');
});

// Event listener triggered when MongoDB reconnects after disconnection
mongoose.connection.on('reconnected', () => {
  console.log('MongoDB reconnected!');
});

// Event listener triggered on MongoDB connection errors
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1)//Exit the process with a failure code
});

// Optional: detect when connection is closed
db.on('close', () => {
  console.warn('MongoDB connection closed');
});


```

| **Event Name**   | **Description**                                                                 |
|------------------|----------------------------------------------------------------------------------|
| `connected`      | Emitted when Mongoose successfully connects to MongoDB.                         |
| `error`          | Emitted if there is an error during initial connection or after being connected.|
| `disconnected`   | Emitted when Mongoose disconnects from the database.                            |
| `reconnected`    | Emitted when Mongoose successfully reconnects after a disconnection.            |
| `connecting`     | Emitted when Mongoose starts connecting to MongoDB.                             |
| `disconnecting`  | Emitted when Mongoose begins disconnecting from the database.                   |
| `close`          | Emitted after the connection has been fully closed.                             |
| `open` (once)    | Emitted once when the initial connection is opened successfully.                |
