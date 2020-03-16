const Table = require('./../../models/Table');
const Restaurant = require('./../../models/Restaurant');
const Order = require('./../../models/Order');
const Addition = require('./../../models/Addition');

const getTables = (req, res) => {
    Table.find({})
        .sort({_id: -1})
        .populate('restaurant')
        .populate('orders')
        .populate('additions')
        .then(tables => {
            res.render('tables/tables', {tables: tables, user: req.session.user});
        }).catch(err => {
        res.render('tables/tables', {
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
            Restaurant.find({}).then(restaurants => {
                res.render('tables/edit', {table: table, user: req.session.user, restaurants: restaurants});
            })
        }).catch(err => {
        res.render('tables/tables', {
            error: err.message
        })
        })
};

const addTable = (req, res) => {
    let newTable = new Table(req.body);
    newTable.save().then(table => {
        Restaurant.findById(table.restaurant).then(restaurant => {
            restaurant.tables.push(table._id)
            restaurant.save().then(restaurant => {
                console.log(restaurant.tables);
            })
        })
        res.redirect('/admin/tables/');
    }).catch(err => {
        res.render('/admin/tables/create');
    })
};

const updateTable = (req, res) => {
    Table.findByIdAndUpdate(req.params.id, req.body)
        .then(table => {
            if (table.restaurant !== req.body.restaurant) {
                Restaurant.findById(table.restaurant).then(restaurant => {
                    restaurant.tables.pull(table._id);
                    restaurant.save().then();
                });
                Restaurant.findById(req.body.restaurant).then(restaurant => {
                    restaurant.tables.push(table._id);
                    restaurant.save().then();
                })
            }
            res.redirect('/admin/tables/');
        }).catch(err => {
        res.redirect('/admin/tables/');
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
                Addition.findByIdAndDelete(id).exec();
            })
            res.render('tables/tables', {success: 'Table deleted successfully'});
        })
        .catch(err => {
        res.render('tables/tables', {
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
            res.render('tables/tables', {tables: tables});
        }).catch(err => {
            res.render('tables/tables', {
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