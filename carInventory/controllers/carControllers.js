
  1
  2
  3
  4
  5
  6
  7
  8
  9
 10
 11
 12
 13
 14
 15
 16
 17
 18
 19
 20
 21
 22
 23
 24
 25
 26
 27
 28
 29
 30
 31
 32
 33
 34
 35
 36
 37
 38
 39
 40
 41
 42
 43
 44
 45
 46
 47
 48
 49
 50
 51
 52
 53
 54
 55
 56
 57
 58
 59
 60
 61
 62
 63
 64
 65
 66
 67
 68
 69
 70
 71
 72
 73
 74
 75
 76
 77
 78
 79
 80
 81
 82
 83
 84
 85
 86
 87
 88
 89
 90
 91
 92
 93
 94
 95
 96
 97
 98
 99
100
101
102
103
104
105
106
107
108
109
110
111
112
113
114
115
116
117
118
119
120
121
122
123
124
125
126
127
128
129
130
131
132
133
134
135
136
137
138
139
140
141
142
143
144
145
146
147
148
149
150
151
152
153
154
155
156
157
158
159
160
161
162
163
164
165
const Car = require('../models/carSchema');// Import the Car model representing the structure of the document in the MongoDB collection

//-----------------GET REQUEST----------------------
// Controller function to retrieve all cars
const findAllCars = async function (req, res) {//Define an aysnc function to fetch all cars from the database
    try {
        // Fetch all cars from the database based on any optional query parameters in req.body
        const cars = await Car.find(req.body);
        res.json(cars);// Respond with the list of cars
    }
    catch (error) {
        // Handle errors during the database query or processing
        console.error('Error fetching cars', error.message);//Log an error message in the console for debugging purposes.
        res.status(500).send('Internal server Error');//Send a 500 (Internal Server Error) status code, and an error message
    }
};

//-----------------POST REQUEST----------------------------------
// Controller function to create a new car
const addCar = async function (req, res) {//Define an async function to add a new car 
    try {
        const newCar = new Car(req.body);// Create a new Car instance with the request body and save it to the database
        await newCar.save(); // Save the new car to the database

        res.status(201).json(newCar);// Respond with the newly created car and a 201 status code (Created)
    } 
    catch (error) {
        // Handle errors during the database query or processing
        console.error('Error adding the new car', error.message);//Log an error message in the console for debugging purposes.
        res.status(500).send('Internal server error');//Send a 500 (Internal Server Error)status code and an error message
    }
};

//Controller function to find cars older than 5 years
const findByModel = async (req, res) => {//Define an async function to find cars older than 5 years from the database
    try {
        
        const currentYear = new Date().getFullYear();// Get the current year to calculate the threshold for models older than 5 years
        // Use the Car model to find cars where the 'model' field is less than or equal to 5 years ago
        const cars = await Car.find({ model: { $lte: currentYear - 5 } });

        // Conditional rendering to check whether cars exist based on the specified criteria
        if (!cars || cars.length === 0) {
            // Respond with a 404 status code and a JSON object indicating no cars were found
            return res.status(404).json({ error: "No cars found" });
        }

        res.json(cars); // Respond with a JSON array of cars that are older than 5 years
    }
    catch (error) {
        // Handle errors during the database query or processing
        console.error('error finding cars', error.message); //Log error message in the console for debugging puposes
        res.status(500).send('Internal server Error');// Respond with a 500 (Internal server error) status code and an error message
    }
}

//-----------------PUT REQUESTS------------------------
// Controller function to update one single car by Id
const updateById = async (req, res) => {//Define an async function to update a single car by its id
    const { _id } = req.params;// Extract the 'make' parameter from the request URL

    try {
        const updatedCar = await Car.findByIdAndUpdate(// Find and update the car based on id
            _id,
            { $set: req.body }, // Update the car with the data in the request body
            { new: true } // Return the updated car instead of the original one
        );

        // Conditional rendering to check whether cars exist based on the specified criteria
        if (!updatedCar) {
            return res.status(404).json('Car not found');
            //Respond with a 404 (Not found)status code and a message indicating the car is not found
        }

        res.json(updatedCar);// Respond with the updated car
        console.log(updatedCar);//Log the updated car to the console

    }
    catch (error) {
        //Handle errors  during the database query or processing
        console.error('Error updating car', error.message);//Log error message in the console for debugging puposes
        res.status(500).send('Internal server Error');// sending a 500 (Internal server Error) status code, and an error message
    }
};


// Controller function to update multiple cars
const updateMultipleCars = async (req, res) => {//Define an async function to update multiple cars
    try {
        // Extract old and new values from the request body
        const { owner: oldOwner, newOwner } = req.body;

        // Conditional rendering to check if either oldOwner or newOwner is missing in the request body
        if (!oldOwner || !newOwner) {
            // If either is missing, respond with a 400 Bad Request status and an error message
            return res.status(400).json({ error: 'Bad Request: Missing parameters' });
        }
        // Log extracted values for debugging purposes
        console.log('Old Owner:', oldOwner);
        console.log('New Owner:', newOwner);

     
        // Update the cars based on the filter criteria for owner
        const result = await Car.updateMany(
            { owner: oldOwner },// Criteria for updating cars with the old owner value
            { $set: { owner: newOwner } },// Update operation: set the 'owner' field to the new owner value
            { new: true }// Options object: { new: true } returns the modified documents
        );
        console.log(owner); //Log the owner value in the console for debugging purposes

        // Conditional rendering to check if any document was updated based on owner
        if (result.nModified === 0) {
            return res.status(404).json({error: 'No cars found to update'})
            // If no cars were found for update, respond with a 404 (Not found) status code and an error message
        }

        console.log(result);// Log the result for debugging purposes
        // Find and return the updated cars
        const updatedCars = await Car.find({ owner: newOwner });
        res.json(updatedCars);
    }
   catch (error) {
        //Handle errors during the database query or processing
        console.error('Error updating cars', error.message);//Log error message in the console for debugging puposes
        res.status(500).send({ error: 'Internal server error' });// Respond with a 500 (Internal Server Error) status code and an error message
    }
};

//--------------DELETE REQUESTS---------------------

//Controller function to remove one car
const removeById = async (req, res) => {//Define an async function to remove a car from the database
    const  _id  = req.params._id;//Extract the Id parameter from the URL

    try {
       
        const removedCar = await Car.findOneAndRemove({ _id }); //Find and remove a car by its id

        //Conditional rendering to check if the car is found
        if (!removedCar) {
            return res.status(404).json({ error: 'Car not found' });
        //Respond with a 404 (Not found) status code and a message indicating the car is not found
        }

        res.json({ message: 'Car removed successfully' });//Respond with a JSON object containing a success message
    } 
    catch (error) {
        //Handle errors during the database query or processing
        console.error('Error removing car', error.message); //Log error message in the console for debugging puposes
        res.status(500).send('Internal server Error');   // Respond with a 500 (Internal Server Error) status code and an error message

    }
};


//-----------------EXPORT FUNCTIONS----------------
// Export the functions so that they can be used in other parts of the application
module.exports = {
   addCar,
   findAllCars,
   updateById,
   removeById,
   findByModel,
   updateMultipleCars
};
