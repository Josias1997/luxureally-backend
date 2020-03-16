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
const authenticationController = require('./../../controllers/client/AuthenticationController');

// @route POST api/auth/login
// @desc Login user
// @access public
router.post('/login', authenticationController.login);


// @route POST api/auth/register
// @desc Get All users
// @access public
router.post('/register', upload.single('picture'), authenticationController.register);

module.exports = router