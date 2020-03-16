const express = require('express');
const router = express.Router();

// Controller
const deliveryController = require('./../../controllers/client/DeliveryController');

// @route GET api/deliveries/
// @desc Get All deliveries
// @access public
router.get('/', deliveryController.getDeliveries);

// @route GET api/deliveries/:id
// @desc Get Delivery
// @access public
router.get('/:id', deliveryController.getDelivery);


// @route GET api/deliveries/restaurant/:id
// @desc Get deliveries by restaurant id
// @access public
router.get('/client/:email', deliveryController.getDeliveriesByClientEmail);



// @route POST api/deliveries/
// @desc Add a new Delivery
// @access public
router.post('/', deliveryController.addDelivery);


// @route PUT api/deliveries/:id
// @desc Update Delivery
// @access public
router.put('/:id', deliveryController.updateDelivery);


// @route PATCH api/deliveries/:id
// @desc Partially update Delivery
// @access public
router.patch('/:id', deliveryController.patchDelivery);


// @route DEL api/deliveries/:id
// @desc Delete Delivery
// @access public
router.delete('/:id', deliveryController.deleteDelivery);


module.exports = router;

