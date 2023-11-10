# MONGOOSE METHODS

## UPDATE 

### UPDATE MANY

```
const updateMultiple = async (req, res) => {
    const { _id } = req.params; 

    try {
        const updateData = req.body; 

        const updatedCars = await Car.updateMany(
            { _id: _id }, // Filter based on _id
            { $set: updateData } // Use $set to update specific fields
        );

        res.status(200).json(updatedCars);
    } catch (error) {
        console.error('Error updating cars', error.message);
        res.status(500).send('Internal server error');
    }
};
```
