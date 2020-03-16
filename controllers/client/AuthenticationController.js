const User = require('./../../models/User');
const Restaurant = require('./../../models/Restaurant');
const cryptoJS = require('crypto-js');
const bcrypt = require('bcryptjs');

const login = (req, res) => {
    username = req.body.username;
    password = req.body.password;

    User.findOne({username: username})
        .exec((err, user) => {
            if (user) {
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if (result) {
                        user.token = cryptoJS.SHA512(user.username + user.password);
                        user.save();
                        res.json(user);
                    }
                    else {
                        res.status(404).json({
                            error: 'Mot de passe incorrect'
                        })
                    }
                })
            } else {
                res.status(404).json({
                    error: 'Incorrect username'
                })
            }
    });
};

const register = (req, res) => {
    const user = new User(req.body);
    if(req.file) {
        user.picture = `/images/${req.file.originalname}`;
    }

    User.findOne({username: user.username})
        .then((user) => {
            res.status(404).json({
                error: 'User already exists!'
            });
        }).catch(err => {   
            bcrypt.genSalt(10, (err, salt) => {
                if (err) {
                    res.status(404).json({
                        error: err.message
                    })
                }
                bcrypt.hash(user.password, salt, (err, hash) => {
                    if (err) {
                        res.status(404).json({
                            error: err.message
                        })
                    }
                    user.password = hash;
                    user.save((err, user) => {
                        if (err) {
                            console.log(err);
                        }
                        if (user) {
                            Restaurant.findById(user.restaurant).then(restaurant => {
                                restaurant.users.push(user._id)
                                restaurant.save().then(restaurant => {
                                    console.log(restaurant.users);
                                })
                            });
                            res.status(200).json(user);
                        }
                    })
                })
            })
        })
};

module.exports = {
    login,
    register
}