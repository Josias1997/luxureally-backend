const Restaurant = require('./../../models/Restaurant');
const User = require('./../../models/User');
const Table = require('./../../models/Table');
const Category = require('./../../models/Category');
const Delivery = require('./../../models/Delivery');


const getRestaurants = (req, res) => {
    Restaurant.find({})
        .sort({name: 1})
        .populate('users')
        .populate('tables')
        .populate('categories')
        .populate('deliveries')
        .then(restaurants => {
            res.status(200).json(restaurants);
        }).catch(err => {
            console.log(err);
        })
}

const getRestaurant = (req, res) => {
    Restaurant.findById(req.params.id)
        .populate('users')
        .populate('tables')
        .populate('categories')
        .populate('orders')
        .populate('deliveries')
        .populate('additions')
        .then(restaurant => {
            res.status(200).json(restaurant)
        })
};

const addRestaurant = (req, res) => {
    let newRestaurant = new Restaurant(req.body);
    newRestaurant.save().then(restaurant => {
        res.json(restaurant);
    })
};

const updateRestaurant = (req, res) => {
    Restaurant.findByIdAndUpdate(req.params.id, req.body)
        .then(restaurant => {
            res.json(restaurant);
        })
};

const deleteRestaurant = (req, res) => {
    Restaurant.findByIdAndDelete(req.params.id)
        .then((restaurant) => {
            restaurant.users.map(id => {
                User.findByIdAndDelete(id).exec();
            })
            restaurant.tables.map(id => {
                User.findByIdAndDelete(id).exec();
            })
            restaurant.categories.map(id => {
                User.findByIdAndDelete(id).exec();
            })
            restaurant.deliveries.map(id => {
                User.findByIdAndDelete(id).exec();
            })
            res.json({success: true})
        })
};


module.exports = {
    getRestaurants,
    getRestaurant,
    addRestaurant,
    updateRestaurant,
    deleteRestaurant
}
