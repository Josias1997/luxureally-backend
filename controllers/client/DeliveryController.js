const Delivery = require('./../../models/Delivery');
const Restaurant = require('./../../models/Restaurant');

const getDeliveries = (req, res) => {
    Delivery.find({})
        .sort({created_at: -1})
        .populate('restaurant')
        .then(deliveries => {
            res.status(200).json(deliveries);
        }).catch(err => {
        res.status(404).json({
            error: err.message
        })
    })
}

const getDelivery = (req, res) => {
    Delivery.findById(req.params.id)
        .populate('restaurant')
        .then(delivery => {
            res.status(200).json(delivery)
        }).catch(err => {
        res.status(404).json({
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
                console.log(restaurant.deliveries);
            })
        })
        res.json(delivery);
    }).catch(err => {
        res.status(404).json({
            error: err.message
        })
    })
};



const updateDelivery = (req, res) => {
    Delivery.findByIdAndUpdate(req.params.id, req.body)
        .then(delivery => {
            res.json(delivery)
        }).catch(err => {
        res.status(404).json({
            error: err.message
        })
    })
};

const patchDelivery = (req, res) => {
    Delivery.findById(req.params.id).then(delivery => {
        Object.keys(req.body).map(key => {
                delivery[key] = req.body[key];
                delivery.save().then(order => {
                    res.json(delivery);
                });
            });
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
            res.json({success: true})
        }).catch(err => {
        res.status(404).json({
            error: err.message
        })
    })
};

const getDeliveriesByClientEmail = (req, res) => {
    Delivery.find({email: req.params.email})
        .populate('restaurant')
        .then(deliveries => {
            res.status(200).json(deliveries);
        }).catch(err => {
            res.status(404).json({
                error: err.message
            })
        })
};


module.exports = {
    getDeliveries,
    getDelivery,
    addDelivery,
    updateDelivery,
    patchDelivery,
    deleteDelivery,
    getDeliveriesByClientEmail
}