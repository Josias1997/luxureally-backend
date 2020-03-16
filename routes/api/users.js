const express = require('express');
const router = express.Router();
const multer = require('multer');

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
const userController = require('./../../controllers/client/UserController');

// @route GET api/users/
// @desc Get All users
// @access public
router.get('/', userController.getUsers);

// @route GET api/users/:id
// @desc Get User
// @access public
router.get('/:id', userController.getUser);

// @route GET api/users/restaurant/:id
// @desc Get users by restaurant id
// @access public
router.get('/restaurant/:id', userController.getUsersByRestaurantId);


// @route PUT api/users/:id
// @desc Update User
// @access public
router.put('/:id', upload.single('picture'), userController.updateUser);


// @route DEL api/users/:id
// @desc Delete User
// @access public
router.delete('/:id', userController.deleteUser);


module.exports = router;

