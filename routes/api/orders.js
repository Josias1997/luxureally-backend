const express = require('express');
const router = express.Router();

// Controller
const orderController = require('./../../controllers/client/OrderController');

// @route GET api/orders/
// @desc Get All orders
// @access public
router.get('/', orderController.getOrders);

// @route GET api/orders/:id
// @desc Get Order
// @access public
router.get('/:id', orderController.getOrder);


// @route GET api/orders/table/:id
// @desc Get orders by table id
// @access public
router.get('/table/:id', orderController.getOrdersByTableId);



// @route POST api/orders/
// @desc Add a new Order
// @access public
router.post('/', orderController.addOrder);


// @route PUT api/orders/:id
// @desc Update Order
// @access public
router.put('/:id', orderController.updateOrder);


// @route PATCH api/order/:id
// @desc Partially update Order
// @access public
router.patch('/:id', orderController.patchOrder);

// @route DEL api/orders/:id
// @desc Delete Order
// @access public
router.delete('/:id', orderController.deleteOrder);


module.exports = router;

