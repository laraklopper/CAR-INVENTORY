const express = require('express');
const router = express.Router();
const carController = require('../controllers/carControllers');

router.post('/addCar', carController.addCar);
router.get('/findAllCars', carController.findAllCars);
router.put('/updateByMake/:make', carController.updateByMake);
router.delete('/removeById/:carId', carController.removeById);

module.exports = router;
