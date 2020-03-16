const Table = require('./../../models/Table');
const Restaurant = require('./../../models/Restaurant');
const Order = require('./../../models/Order');
const Addition = require('./../../models/Addition');

const getTables = (req, res) => {
    Table.find({})
        .sort({number: 1})
        .populate('restaurant')
        .populate('orders')
        .populate('additions')
        .then(tables => {
            res.status(200).json(tables);
        }).catch(err => {
            res.status(404).json({
                error: err.message
            })
        })
}

const getTable = (req, res) => {
    Table.findById(req.params.id)
        .populate('restaurant')
        .populate('orders')
        .populate('additions')
        .then(table => {
            res.status(200).json(table)
        }).catch(err => {
            res.status(404).json({
                error: err.message
            })
        })
};

const addTable = (req, res) => {
    let newTable = new  Table(req.body);
    newTable.save().then(table => {
        Restaurant.findById(table.restaurant).then(restaurant => {
            restaurant.tables.push(table._id)
            restaurant.save().then(restaurant => {
                console.log(restaurant.tables);
            })
        })
        res.json(table);
    }).catch(err => {
        res.status(404).json({
            error: err.message
        })
    })
};

const updateTable = (req, res) => {
    Table.findByIdAndUpdate(req.params.id, req.body)
        .then(table => {
            res.json(table)
        }).catch(err => {
        res.status(404).json({
            error: err.message
        })
    })

};

const deleteTable = (req, res) => {
    Table.findByIdAndDelete(req.params.id)
        .then((table) => {
            Restaurant.findById(table.restaurant).then(restaurant => {
                restaurant.tables.pull(table._id)
                restaurant.save().then(restaurant => {
                    console.log(restaurant.tables);
                })
            });
            table.orders.map(id => {
                Order.findByIdAndDelete(id).exec();
            })
            table.additions.map(id => {
                Order.findByIdAndDelete(id).exec();
            })
            res.json({success: true})
        })
        .catch(err => {
            res.status(404).json({
                error: err.message
            })
        })

};

const getTablesByRestaurantId = (req, res) => {
    Table.find({restaurant: req.params.id})
        .populate('restaurant')
        .populate('orders')
        .populate('additions')
        .then(tables => {
            res.status(200).json(tables)
        }).catch(err => {
            res.status(404).json({
                error: err.message
            })
        })
};

module.exports = {
    getTables,
    getTable,
    addTable,
    updateTable,
    deleteTable,
    getTablesByRestaurantId
}