const express = require('express');
const router = express.Router();

// Controller
const additionController = require('./../../controllers/client/AdditionController');


// @route GET api/additions/
// @desc Get All additions
// @access public
router.get('/', additionController.getAdditions);


// @route GET api/additions/:id
// @desc Get Addition
// @access public
router.get('/:id', additionController.getAddition);


// @route GET api/additions/table/:id
// @desc Get additions by table id
// @access public
router.get('/table/:id', additionController.getAdditionsByTableId);




// @route POST api/additions/
// @desc Add a new Addition
// @access public
router.post('/', additionController.addAddition);



// @route PUT api/additions/:id
// @desc Update Addition
// @access public
router.put('/:id', additionController.updateAddition);


// @route DEL api/additions/:id
// @desc Delete Addition
// @access public
router.delete('/:id', additionController.deleteAddition);


module.exports = router;

