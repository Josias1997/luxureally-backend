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
                        req.session.user = user;
                        res.redirect('/admin/dashboard');
                    }
                    else {
                        res.render('authentication/login', {error: "Incorrect password"});
                    }
                })
            } else {
                res.render('authentication/login', {error: "Incorrect username"});
            }
    });
};

const register = (req, res) => {
    if(req.file) {
        user.picture = `/images/${req.file.originalname}`;
    }

    User.findOne({username: user.username})
        .then((user) => {
            res.render('users/create', {
                error: 'User already exists!'
            });
            return;
        }).catch(err => {
            console.log(err);
            return;
        })

    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            res.redirect('/admin/users/create');
        }
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) {
                res.redirect('/admin/users/');
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
                            res.redirect('/admin/users/');
                        });
                    });
                }
            })
        })
    })
};

const logout = (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.clearCookie('user_sid');
        res.redirect('/admin')
    } else {
        res.redirect('/admin/login');
    }
};

module.exports = {
    login,
    register,
    logout
}