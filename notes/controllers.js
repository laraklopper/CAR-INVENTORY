const Car = require('../models/carSchema');

//-----------------GET REQUEST----------------------
const findAllCars = async function (req, res) {
    try {
        const cars = await Car.find(req.body);
        res.json(cars);
    } catch (error) {
        console.error('Error fetching cars', error.message);
        res.status(500).send('Internal server error');
    }
};

//-----------------POST REQUEST----------------------------------
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
        const model = parseInt(req.body.model);
        const cars = await Car.find({ model: { $lte: 2018 } });

        if (!cars || cars.length === 0) {
            return res.status(404).json({ error: "No cars found" });
        }

        res.json(cars);
    } catch (error) {
        console.error('Error finding cars', error.message);
        res.status(500).send('Internal server error');
    }
}

//-----------------PUT REQUESTS------------------------
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
        res.status(500).send('Internal server error');
    }
};

const updateMultipleCars = async (req, res) => {
    try {
        const oldOwner = req.body.owner;
        const newOwner = req.body.newOwner;

        console.log('Old Owner:', oldOwner);
        console.log('New Owner:', newOwner);

        const { nModified } = await Car.updateMany(
            { owner: oldOwner },
            { $set: { owner: newOwner } }
        );

        if (nModified === 0) {
            return res.status(404).json({ error: 'No cars found for update' });
        }

        const updatedCars = await Car.find({ owner: newOwner });
        res.json(updatedCars);
    } catch (error) {
        console.error('Error updating cars', error.message);
        res.status(500).send({ error: 'Internal server error' });
    }
};

//--------------DELETE REQUESTS---------------------
const removeById = async (req, res) => {
    const _id = req.params._id;

    console.log(_id + " Remove by Id");
    try {
        const removedCar = await Car.findOneAndRemove({ _id });

        if (!removedCar) {
            return res.status(404).json({ error: 'Car not found' });
        }

        res.json({ message: 'Car removed successfully' });
    } catch (error) {
        console.error('Error removing car', error.message);
        res.status(500).send('Internal server error');
    }
};

//-----------------EXPORT FUNCTIONS----------------
module.exports = {
    addCar,
    findAllCars,
    updateById,
    removeById,
    findByModel,
    updateMultipleCars
};
