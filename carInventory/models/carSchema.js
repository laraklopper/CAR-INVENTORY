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
