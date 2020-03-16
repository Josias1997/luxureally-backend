const User = require('./../../models/User');

const getUsers = (req, res) => {
    User.find({})
        .sort({title: 1})
        .populate('restaurant')
        .then(users => {
            res.status(200).json(users);
        }).catch(err => {
            res.status(404).json({
                error: err.message
            })
        })

}

const getUser = (req, res) => {
    User.findById(req.params.id)
        .populate('restaurant')
        .then(user => {
            res.status(200).json(user)
        }).catch(err => {
            res.status(404).json({
                error: err.message
            })
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
    User.findByIdAndUpdate(req.params.id, user)
        .then(user => {
            res.json(user)
        }).catch(err => {
            res.status(404).json({
                error: err.message
            })
        })

};

const deleteUser = (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then((user) => {
            Restaurant.findById(user.restaurant).then(restaurant => {
                restaurant.users.pull(user._id)
                restaurant.save().then(restaurant => {
                    console.log(restaurant.users);
                })
            });
            res.json({success: true})
        })
        .catch(err => {
            res.status(404).json({
                error: err.message
            })
        })
};

const getUsersByRestaurantId = (req, res) => {
    User.find({restaurant: req.params.restaurant_id})
        .populate('restaurant')
        .then(users => {
            res.status(200).json(users)
        }).catch(err => {
            res.status(404).json({
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