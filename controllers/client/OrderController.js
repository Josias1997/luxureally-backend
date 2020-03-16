const Order = require('./../../models/Order');
const Table = require('./../../models/Table');

const getOrders = (req, res) => {
    Order.find({})
        .sort({created_at: -1})
        .populate('table')
        .then(orders => {
            res.status(200).json(orders);
        }).catch(err => {
            res.status(404).json({
                error: err.message
            })
        })
}

const getOrder = (req, res) => {
    Order.findById(req.params.id)
        .populate('table')
        .then(order => {
            res.status(200).json(order)
        }).catch(err => {
            res.status(404).json({
                error: err.message
            })
        })
};

const addOrder = (req, res) => {
    let newOrder = new Order(req.body);
    newOrder.save().then(order => {
        Table.findById(order.table).then(table => {
            table.orders.push(order._id);
            table.save().then(table => {
                console.log(table.orders);
            })
        });
        res.json(order);
    }).catch(err => {
            res.status(404).json({
                error: err.message
            })
        })
};

const updateOrder = (req, res) => {
    Order.findByIdAndUpdate(req.params.id, req.body)
        .then(order => {
            res.json(order)
        }).catch(err => {
            res.status(404).json({
                error: err.message
            })
        })
};

const patchOrder = (req, res) => {
    Order.findById(req.params.id).then(order => {
            Object.keys(req.body).map(key => {
                order[key] = req.body[key];
                order.save().then(order => {
                res.json(order);
            });
        })
    })
};

const deleteOrder = (req, res) => {
    Order.findByIdAndDelete(req.params.id)
        .then((order) => {
            Table.findById(order.table).then(table => {
                table.orders.pull(order._id);
                table.save().then(table => {
                })
            }); 
            res.json({success: true})
        }).catch(err => {
            res.status(404).json({
                error: err.message
            })
        })
};

const getOrdersByTableId = (req, res) => {
    Order.find({table: req.params.id})
        .populate('table')
        .then(orders => {
            res.status(200).json(orders)
        }).catch(err => {
            res.status(404).json({
                error: err.message
            })
        })
};


module.exports = {
    getOrders,
    getOrder,
    addOrder,
    updateOrder,
    patchOrder,
    deleteOrder,
    getOrdersByTableId
}