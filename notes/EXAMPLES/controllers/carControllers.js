const Car = require('../models/carSchema');

// Controller function to create a new car
const addCar = async function (req, res) {
    try {
        const newCar = new Car(req.body);
        await newCar.save();
        res.status(201).json(newCar);
    } catch (error) {
        console.error('Error adding the new car', error.message);
        res.status(500).send('Internal server error');
    }
};

// Controller function to retrieve all cars
const findAllCars = async function (req, res) {
    try {
        const cars = await Car.find(req.body);
        res.json(cars);
    } catch (error) {
        console.error('Error fetching cars', error.message);
        res.status(500).send('Internal server Error');
    }
};

// Controller function to update one single car by Id
const updateById = async (req, res) => {
    const { _id } = req.params;

    try {
        const updatedCar = await Car.findByIdAndUpdate(
            _id,
            { $set: req.body },
            { new: true }
        );

        if (!updatedCar) {
            return res.status(404).json('Car not found');
        }

        res.json(updatedCar);
        console.log(updatedCar);

    } catch (error) {
        console.error('Error updating car', error.message);
        res.status(500).send('Internal server Error');
    }
};

// Controller function to remove one car
const removeById = async (req, res) => {
    const { _id } = req.params;

    try {
        const removedCar = await Car.findOneAndRemove({ _id });

        if (!removedCar) {
            return res.status(404).json({ error: 'Car not found' });
        }

        res.json({ message: 'Car removed successfully' });
    } catch (error) {
        console.error('Error removing car', error.message);
        res.status(500).send('Internal server Error');
    }
};

// Controller function to find cars older than 5 years
const findByModel = async (req, res) => {
    try {
        const cars = await Car.find({ model: { $lte: 2018 } });

        if (!cars || cars.length === 0) {
            return res.status(404).json({ error: "No cars found" });
        }

        res.json(cars);
    } catch (error) {
        console.error('error finding cars', error.message);
        res.status(500).send('Internal server Error');
    }
}

// Controller function to update multiple cars
const updateMultiple = async (req, res) => {
    const { _id } = req.params;

    try {
        const updateData = req.body;

        const updatedCars = await Car.updateMany(
            { _id: _id },
            { $set: updateData }
        );

        // Conditional rendering to check if any documents were updated (nModified is the number of modified documents)
        if (updatedCars.nModified === 0) {
                        // If no documents were modified, return a 404 (Not Found) status with an error message
            return res.status(404).json({ error: 'No cars found for update' });
        }
        
        // If at least one document was modified, respond with a success message and the update data
        res.status(200).json({ message: 'Cars updated successfully', updatedCars });
    } catch (error) {
        console.error('Error updating cars', error.message);
        res.status(500).send('Internal server error');
    }
}

// Export the functions so that they can be used in other parts of the application
module.exports = {
    addCar,
    findAllCars,
    updateById,
    removeById,
    findByModel,
    updateMultiple
};
