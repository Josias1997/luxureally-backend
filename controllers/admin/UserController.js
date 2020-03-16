const User = require('./../../models/User');
const Restaurant = require('./../../models/Restaurant');
const bcrypt = require('bcryptjs');

const getUsers = (req, res) => {
    User.find({})
        .sort({created_at: -1})
        .populate('restaurant')
        .then(users => {
            res.render('users/users', {users: users, user: req.session.user});
        }).catch(err => {
            res.render('users/users', {
                error: err.message
            })
        })

}

const getUser = (req, res) => {
    User.findById(req.params.id)
        .populate('restaurant')
        .then(user => {
            Restaurant.find({})
                .then(restaurants => {
                    res.render('users/edit', {currentUser: user, user: req.session.user, restaurants: restaurants});
                })
        }).catch(err => {
        res.redirect('/amdin/users/');
    })

};

const updateUser = (req, res) => {
    const user = new User({
        _id: req.params.id,
        ...req.body,
    });

    if (req.file) {
        user.picture = `/images/${req.file.originalname}`;
    }

    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            console.log(err);
        }
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) {
                console.log(err);
            }
            else {
                user.password = hash;
                const restaurant = user.restaurant;
                User.findByIdAndUpdate(req.params.id, user)
                    .then(user => {
                        if (restaurant !== user.restaurant) {
                            Restaurant.findById(restaurant)
                                .then(restaurant => {
                                    restaurant.users.push(user._id);
                                    restaurant.save().then();
                                })
                            Restaurant.findById(user.restaurant).then(restaurant => {
                                restaurant.users.pull(user._id);
                                restaurant.save().then()
                            })
                        }
                        res.redirect('/admin/users/');
                    }).catch(err => {
                        console.log(err);
                        res.redirect('/admin/users/');
        })
            }
        });
    });

};

const deleteUser = (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then((user) => {
            Restaurant.findById(user.restaurant).then(restaurant => {
                restaurant.users.pull(user._id)
                restaurant.save().then(restaurant => {
                    console.log(restaurant.users);
                }).catch(err => {
                    console.log(err);
                })
            });
            res.render('users/users', {success: 'User deleted successfully'});
        })
        .catch(err => {
        res.render('users/users', {
            error: err.message
        })
        })
};

const getUsersByRestaurantId = (req, res) => {
    User.find({restaurant: req.params.restaurant_id})
        .populate('restaurant')
        .then(users => {
            res.render('users/users', {users: users});
        }).catch(err => {
        res.render('users/users', {
            error: err.message
        })
        })
};


module.exports = {
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    getUsersByRestaurantId
}