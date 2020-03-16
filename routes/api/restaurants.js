const express = require('express');
const router = express.Router();

// Controller
const restaurantController = require('./../../controllers/client/RestaurantController');

// @route GET api/restaurants/
// @desc Get All restaurants
// @access public
router.get('/', restaurantController.getRestaurants);

// @route GET api/restaurants/:id
// @desc Get Restaurant
// @access public
router.get('/:id', restaurantController.getRestaurant);


// @route POST api/restaurants/
// @desc Add a new Restaurant
// @access public
router.post('/', restaurantController.addRestaurant);


// @route PUT api/restaurants/:id
// @desc Update Restaurant
// @access public
router.put('/:id', restaurantController.updateRestaurant);

// @route DEL api/restaurants/:id
// @desc Delete Restaurant
// @access public
router.delete('/:id', restaurantController.deleteRestaurant);


module.exports = router;

