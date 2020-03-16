const express = require('express');
const router = express.Router();

// Controller
const orderItemController = require('./../../controllers/client/OrderItemController');

// @route GET api/orderItems/
// @desc Get All orderItems
// @access public
router.get('/', orderItemController.getOrderItems);

// @route GET api/orderItems/:id
// @desc Get OrderItem
// @access public
router.get('/:id', orderItemController.getOrderItem);


// @route POST api/orderItems/
// @desc Add a new OrderItem
// @access public
router.post('/', orderItemController.addOrderItem);


// @route PUT api/orderItems/:id
// @desc Update OrderItem
// @access public
router.put('/:id', orderItemController.updateOrderItem);

// @route DEL api/orderItems/:id
// @desc Delete OrderItem
// @access public
router.delete('/:id', orderItemController.deleteOrderItem);


module.exports = router;

