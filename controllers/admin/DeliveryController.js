const Delivery = require('./../../models/Delivery');
const Restaurant = require('./../../models/Restaurant');

const getDeliveries = (req, res) => {
    Delivery.find({})
        .sort({created_at: -1})
        .populate('restaurant')
        .then(deliveries => {
            res.render('deliveries/deliveries', {deliveries: deliveries, user: req.session.user});
        }).catch(err => {
        res.render('deliveries/deliveries', {
            error: err.message
        })
    })
}

const getDelivery = (req, res) => {
    Delivery.findById(req.params.id)
        .populate('restaurant')
        .then(delivery => {
            Restaurant.find({}).then(restaurants => {
                Food.find({}).then(foods => {
                    res.render('deliveries/edit', {delivery: delivery, user: req.session.user, restaurants: restaurants, foods: foods});
                });
            });
        }).catch(err => {
        res.render('deliveries/deliveries', {
            error: err.message
        })
    })
};

const addDelivery = (req, res) => {
    let newDelivery = new Delivery(req.body);
    newDelivery.save().then(delivery => {
        Restaurant.findById(delivery.restaurant).then(restaurant => {
            restaurant.deliveries.push(delivery._id)
            restaurant.save().then(restaurant => {
                res.redirect('/admin/deliveries/');
            })
        })
    }).catch(err => {
        res.redirect('/admin/deliveries/');
    })
};



const updateDelivery = (req, res) => {
    Delivery.findByIdAndUpdate(req.params.id, req.body)
        .then(delivery => {
            res.redirect('/admin/deliveries/');
        }).catch(err => {
        res.redirect('/admin/deliveries/');
    })
};

const deleteDelivery = (req, res) => {
    Delivery.findByIdAndDelete(req.params.id)
        .then((delivery) => {
            Restaurant.findById(delivery.restaurant).then(restaurant => {
                restaurant.deliveries.pull(delivery._id)
                restaurant.save().then(restaurant => {
                    console.log(restaurant.deliveries);
                })
            });
            res.render('deliveries/deliveries', {success: 'Delivery deleted successfully'});
        }).catch(err => {
        res.render('deliveries/deliveries', {
            error: err.message
        })
    })
};

const getDeliveriesByRestaurantId = (req, res) => {
    Delivery.find({restaurant: req.params.id})
        .populate('restaurant')
        .then(deliveries => {
            res.render('deliveries/deliveries', {deliveries: deliveries});
        }).catch(err => {
            res.render('deliveries/deliveries', {
                error: err.message
            })
        })
};


module.exports = {
    getDeliveries,
    getDelivery,
    addDelivery,
    updateDelivery,
    deleteDelivery,
    getDeliveriesByRestaurantId
}