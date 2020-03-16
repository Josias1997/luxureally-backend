const Order = require('./../../models/Order');
const Table = require('./../../models/Table');

const getOrders = (req, res) => {
    Order.find({})
        .sort({created_at: -1})
        .populate('table')
        .then(orders => {
            res.render('orders/orders', {orders: orders, user: req.session.user});
        }).catch(err => {
        res.render('orders/orders', {
            error: err.message
        })
        })
}

const getOrder = (req, res) => {
    Order.findById(req.params.id)
        .populate('table')
        .then(order => {
            Table.find({}).then(tables => {
                Food.find({}).then(foods => {
                    res.render('orders/edit', {order: order, user: req.session.user, tables: tables, foods: foods});
                });
            });
        }).catch(err => {
        res.render('orders/orders', {
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
                 res.redirect('/admin/orders/');
            })
        });
    }).catch(err => {
        res.redirect('/admin/orders/');
    })
};

const updateOrder = (req, res) => {
    Order.findByIdAndUpdate(req.params.id, req.body)
        .then(order => {
            res.redirect('/admin/orders/');
        }).catch(err => {
            res.redirect('/admin/orders/');
        })
};


const deleteOrder = (req, res) => {
    Order.findByIdAndDelete(req.params.id)
        .then((order) => {
            Table.findById(order.table).then(table => {
                table.orders.pull(order._id);
                table.save().then(table => {
                    console.log(table.orders);
                })
            }); 
            res.render('orders/orders', {success: 'Order deleted successfully'});
        }).catch(err => {
        res.render('orders/orders', {
            error: err.message
        })
        })
};

const getOrdersByTableId = (req, res) => {
    Order.find({table: req.params.id})
        .populate('table')
        .then(orders => {
            res.render('orders/orders', {orders: orders});
        }).catch(err => {
        res.render('orders/orders', {
            error: err.message
        })
        })
};


module.exports = {
    getOrders,
    getOrder,
    addOrder,
    updateOrder,
    deleteOrder,
    getOrdersByTableId
}