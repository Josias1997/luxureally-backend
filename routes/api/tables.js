const express = require('express');
const router = express.Router();

// Controller
const tableController = require('./../../controllers/client/TableController');

// @route GET api/tables/
// @desc Get All tables
// @access public
router.get('/', tableController.getTables);

// @route GET api/tables/:id
// @desc Get Table
// @access public
router.get('/:id', tableController.getTable);


// @route GET api/tables/restaurant/:id
// @desc Get tables by restaurant id
// @access public
router.get('/restaurant/:id', tableController.getTablesByRestaurantId);



// @route POST api/tables/
// @desc Add a new Table
// @access public
router.post('/', tableController.addTable);


// @route PUT api/tables/:id
// @desc Update Table
// @access public
router.put('/:id', tableController.updateTable);

// @route DEL api/tables/:id
// @desc Delete Table
// @access public
router.delete('/:id', tableController.deleteTable);


module.exports = router;

