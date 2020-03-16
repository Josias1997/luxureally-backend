const OrderItem = require('./../../models/OrderItem');

const getOrderItems = (req, res) => {
    OrderItem.find({})
        .sort({title: 1})
        .then(orderItems => {
            res.status(200).json(orderItems);
        }).catch(err => {
        res.status(404).json({
            error: err.message
        })
    })
}

const getOrderItem = (req, res) => {
    User.findById(req.params.id)
        .then(orderItem => {
            res.status(200).json(orderItem);
        }).catch(err => {
        res.status(404).json({
            error: err.message
        })
    })
};

const addOrderItem = (req, res) => {
    let newOrderItem = new OrderItem(req.body);
    newOrderItem.save().then(orderItem => {
        res.json(orderItem);
    }).catch(err => {
        res.status(404).json({
            error: err.message
        })
    })
};

const updateOrderItem = (req, res) => {
    OrderItem.findByIdAndUpdate(req.params.id, req.body)
        .then(orderItem => {
            res.json(orderItem)
        }).catch(err => {
        res.status(404).json({
            error: err.message
        })
    })
};

const deleteOrderItem = (req, res) => {
    OrderItem.findByIdAndDelete(req.params.id)
        .then(() => res.json({success: true})).catch(err => {
        res.status(404).json({
            error: err.message
        })
    })
};


module.exports = {
    getOrderItems,
    getOrderItem,
    addOrderItem,
    updateOrderItem,
    deleteOrderItem
}