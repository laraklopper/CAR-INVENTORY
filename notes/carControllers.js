const Car = require('../models/carSchema');

const findAllCars = async function (req, res) {
    try {
        const cars = await Car.find(req.body);
        res.json(cars);
    } catch (error) {
        console.error('Error fetching cars', error.message);
        res.status(500).send('Internal server Error');
    }
};

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

const findByModel = async (req, res) => {
    try {
        const currentYear = new Date().getFullYear();
        const cars = await Car.find({ model: { $lte: currentYear - 5 } });

        if (!cars || cars.length === 0) {
            return res.status(404).json({ error: "No cars found" });
        }

        res.json(cars);
    } catch (error) {
        console.error('Error finding cars', error.message);
        res.status(500).send('Internal server Error');
    }
};

const updateById = async (req, res) => {
    const { _id } = req.params;

    try {
        const updatedCar = await Car.findByIdAndUpdate(
            _id,
            { $set: req.body },
            { new: true }
        );

        if (!updatedCar) {
            return res.status(404).json({ error: 'Car not found' });
        }

        res.json(updatedCar);
        console.log(updatedCar);
    } catch (error) {
        console.error('Error updating car', error.message);
        res.status(500).send('Internal server Error');
    }
};

const updateMultipleCars = async (req, res) => {
    try {
        const { owner: oldOwner, newOwner } = req.body;

        if (!oldOwner || !newOwner) {
            return res.status(400).json({ error: 'Bad Request: Missing parameters' });
        }

        console.log('Old Owner:', oldOwner);
        console.log('New Owner:', newOwner);

        const result = await Car.updateMany(
            { owner: oldOwner },
            { $set: { owner: newOwner } },
            { new: true }
        );

        if (result.nModified === 0) {
            return res.status(404).json({ error: 'No cars found to update' });
        }

        console.log(result);
        const updatedCars = await Car.find({ owner: newOwner });
        res.json(updatedCars);
    } catch (error) {
        console.error('Error updating cars', error.message);
        res.status(500).send({ error: 'Internal server error' });
    }
};

const removeById = async (req, res) => {
    const _id = req.params._id;

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

module.exports = {
    addCar,
    findAllCars,
    updateById,
    removeById,
    findByModel,
    updateMultipleCars
};
