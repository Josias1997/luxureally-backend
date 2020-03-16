const Restaurant = require('./../../models/Restaurant');
const User = require('./../../models/User');
const Table = require('./../../models/Table');
const Category = require('./../../models/Category');
const Delivery = require('./../../models/Delivery');


const getRestaurants = (req, res) => {
    Restaurant.find({})
        .sort({created_at: -1})
        .populate('users')
        .populate('tables')
        .populate('categories')
        .populate('deliveries')
        .then(restaurants => {
            res.render('restaurants/restaurants', {restaurants: restaurants, user: req.session.user});
        }).catch(err => {
            res.render('restaurants/restaurants', {
                error: err.message
            })
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
            res.render('restaurants/edit', {restaurant: restaurant, user: req.session.user});
        }).catch(err => {
            res.render('restaurants/restaurants', {
                error: err.message
            })
        })
};

const addRestaurant = (req, res) => {
    let newRestaurant = new Restaurant(req.body);
    newRestaurant.save().then(restaurant => {
        res.redirect('/admin/restaurants/');
    }).catch(err => {
            res.redirect('/admin/restaurants/');
        })
};

const updateRestaurant = (req, res) => {
    Restaurant.findByIdAndUpdate(req.params.id, req.body)
        .then(restaurant => {
            res.redirect('/admin/restaurants/');
        }).catch(err => {
            res.redirect('/admin/restaurants/');
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
            res.render('restaurants/restaurants', {success: 'Restaurant deleted successfully'});
        }).catch(err => {
            res.render('restaurants/restaurants', {
                error: err.message
            })
        })
};


module.exports = {
    getRestaurants,
    getRestaurant,
    addRestaurant,
    updateRestaurant,
    deleteRestaurant
}
