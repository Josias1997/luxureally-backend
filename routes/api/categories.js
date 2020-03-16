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
const categoryController = require('./../../controllers/client/CategoryController');

// @route GET api/categories/
// @desc Get All categories
// @access public
router.get('/', categoryController.getCategories);

// @route GET api/categories/:id
// @desc Get Category
// @access public
router.get('/:id', categoryController.getCategory);


// @route GET api/categories/restaurant/:id
// @desc Get categories by restaurant id
// @access public
router.get('/restaurant/:id', categoryController.getCategoriesByRestaurantId);


// @route POST api/categories/
// @desc Add a new Category
// @access public
router.post('/', upload.single('image'), categoryController.addCategory);


// @route PUT api/categories/:id
// @desc Update Category
// @access public
router.put('/:id', upload.single('image'), categoryController.updateCategory);

// @route DEL api/categories/:id
// @desc Delete Category
// @access public
router.delete('/:id', categoryController.deleteCategory);


module.exports = router;

