# MONGODB NODE.JS DRIVER


**Install the MongoDB Node.js driver:**
   ```
   npm install mongodb
   ```
## BASIC EXAMPLE

1. **Install the MongoDB Node.js driver:**
   ```
   npm install mongodb
   ```

2. **Create a simple Node.js script:**
   ```javascript
   const { MongoClient } = require('mongodb');

   // Connection URI
   const uri = 'mongodb://localhost:27017';

   // Database Name
   const dbName = 'your-database-name';

   // Create a new MongoClient
   const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

   // Connect to the server
   client.connect(async err => {
     if (err) {
       console.error('Error connecting to MongoDB:', err);
       return;
     }

     console.log('Connected to MongoDB');

     // Perform database operations
     const db = client.db(dbName);

     // Example: Insert a document into a collection
     const collection = db.collection('your-collection-name');
     const document = { key: 'value' };
     const result = await collection.insertOne(document);
     console.log(`Inserted ${result.insertedCount} document`);

     // Example: Find documents in a collection
     const documents = await collection.find({}).toArray();
     console.log('Found documents:', documents);

     // Close the connection
     client.close();
   });
   ```

3. **Run the script:**
   ```
   node your-script-name.js
   ```
## REFERENCES

- https://www.npmjs.com/package/mongodb?activeTab=readme
- 
