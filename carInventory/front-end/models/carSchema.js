const mongoose = require('mongoose');

let carSchema = mongoose.Schema({
    make: {
        type: String,
        required: true,
    },
    model

: {
        type: String,
        required: true,
    },
    registration: {
        type: String,
        required: true,
    },
    owner: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('carInventory', carSchema);
