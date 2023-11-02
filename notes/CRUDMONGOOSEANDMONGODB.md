# CRUD OPERATIONS WITH MONGOOSE AND MONGODB ATLAS
Mongoose supports all the CRUD operations – 
- `Create`,
- `Read`,
- `Update`, and
- `Delete`.

![image](https://github.com/laraklopper/LT8-Data-Interaction/assets/135839853/23c83f6a-a117-4fe6-93b7-d683249535a7)

## TABLE OF CONTENTS
1. [HOW TO PERFORM CRUD OPERATIONS IN MONGOOSE AND MONGODB ATLAS](#how-to-perform-crud-operations-in-mongodb-and-mongodb-atlas)
2. [REFERENCES](#references)


## HOW TO PERFORM CRUD OPERATIONS IN MONGOOSE AND MONGODB ATLAS

### SETUP THE PROJECT
Create a new project directory:
```
mkdir new-project
```
Navigate to the project directory
```
cd new-project
```
Initialise a new npm project

```
npm init
```
Install, `express` and `mongoose`
```
npm install express

npm install mongoose
```

### CONNECT MONGODB ATLAS TO THE NODE.JS APP
Create a new file to run the Express server, connect to the MongoDB Atlas database, and import future routes.
```
const express = require("express");
const mongoose = require("mongoose");
const foodRouter = require("./routes/foodRoutes.js");

const app = express();

app.use(express.json());

mongoose.connect(
  "mongodb+srv://madmin:<password>@clustername.mongodb.net/<dbname>?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }
);

app.use(foodRouter);

app.listen(3000, () => {
  console.log("Server is running...");
});
```
### CREATE A MONGOOSE SCHEMA

Create a new `models` directory
```
mkdir models
```
```
const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  calories: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) throw new Error("Negative calories aren't real.");
    },
  },
});

const Food = mongoose.model("Food", FoodSchema);

module.exports = Food;
```
### IMPLEMENT CRUD OPERATIONS
Create a new routes directory:
```
mkdir routes
```
#### **CREATE**
The Mongoose query function .save() is used for `POST` requests to save data passed to it to the database.
```
app.post("/food", async (request, response) => {
  const food = new foodModel(request.body);

  try {
    await food.save();
    response.send(food);
  } catch (error) {
    response.status(500).send(error);
  }
});
```
#### **READ**
The Mongoose query function find() returns all objects with matching parameters. If no parameters are provided, it returns all the items in the database
```
const express = require("express");
const foodModel = require("../models/food");
const app = express();

app.get("/foods", async (request, response) => {
  const foods = await foodModel.find({});

  try {
    response.send(foods);
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = app;
````
#### **UPDATE**
```
app.patch("/food/:id", async (request, response) => {
  try {
    await foodModel.findByIdAndUpdate(request.params.id, request.body);
    await foodModel.save();
    response.send(food);
  } catch (error) {
    response.status(500).send(error);
  }
});
```
#### **DELETE** 
To delete a record from the database, we make use of the function .remove(). It accepts a condition that is the parameter according to which it performs a `DELETE` request.
```
app.delete("/food/:id", async (request, response) => {
  try {
    const food = await foodModel.findByIdAndDelete(request.params.id);

    if (!food) response.status(404).send("No item found");
    response.status(200).send();
  } catch (error) {
    response.status(500).send(error);
  }
});

```
## REFERENCES

- https://www.digitalocean.com/community/tutorials/nodejs-crud-operations-mongoose-mongodb-atlas#prerequisites
- https://www.geeksforgeeks.org/node-js-crud-operations-using-mongoose-and-mongodb-atlas/
- https://www.geeksforgeeks.org/crud-operations-and-file-upload-using-node-js-and-mongodb/
