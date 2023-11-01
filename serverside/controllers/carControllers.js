const Car = require('./models/carSchema');

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

const findAllCars = async function (req, res) {
    try {
        const cars = await Car.find();
        res.json(cars);
    } catch (error) {
        console.error('Error fetching cars', error.message);
        res.status(500).send('Internal server Error');
    }
};

const updateById = async (req, res) => {
    const { make } = req.params;
    try {
        const updatedCar = await Car.findOneAndUpdate(
            { make },
            { $set: req.body },
            { new: true }
        );
        if (!updatedCar) {
            return res.status(404).send('Car not found');
        }
        res.json(updatedCar);
    } catch (error) {
        console.error('Error updating car', error.message);
        res.status(500).send('Internal server Error');
    }
};

module.exports = {
    addCar,
    findAllCars,
    updateById,
};

