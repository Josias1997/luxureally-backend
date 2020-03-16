const express = require('express');
const multer = require('multer');
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/images/");
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, `${file.originalname}`);
    }
});

const upload = multer({
    storage
});

// Controller
const foodController = require('./../../controllers/client/FoodController');

// @route GET api/foods/
// @desc Get All foods
// @access public
router.get('/', foodController.getFoods);


// @route GET api/foods/:id
// @desc Get Food
// @access public
router.get('/:id', foodController.getFood);


// @route GET api/foods/category/:id
// @desc Get foods by category id
// @access public
router.get('/category/:id', foodController.getFoodsByCategoryId);


// @route POST api/foods/
// @desc Add a new Food
// @access public
router.post('/', upload.single('image'), foodController.addFood);


// @route PUT api/foods/:id
// @desc Update Food
// @access public
router.put('/:id', upload.single('image'), foodController.updateFood);


// @route DEL api/foods/:id
// @desc Delete Food
// @access public
router.delete('/:id', foodController.deleteFood);


module.exports = router;

