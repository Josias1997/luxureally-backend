const express = require('express');
const router =  express.Router();
const bcrypt = require('bcryptjs');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/images/");
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`);
    }
});

const upload = multer({
    storage
});

// Controllers

const restaurantController = require('./../../controllers/admin/RestaurantController');
const userController = require('./../../controllers/admin/UserController');
const tableController = require('./../../controllers/admin/TableController');
const categoryController = require('./../../controllers/admin/CategoryController');
const deliveryController = require('./../../controllers/admin/DeliveryController');
const foodController = require('./../../controllers/admin/FoodController');
const additionController = require('./../../controllers/admin/AdditionController');
const orderController = require('./../../controllers/admin/OrderController');
const authenticationController = require('./../../controllers/admin/authenticationController');

// Models
const Restaurant = require('./../../models/Restaurant');
const Category = require('./../../models/Category');
const Table = require('./../../models/Table');
const Food = require('./../../models/Food');

let sessionChecker = (req, res, next) => {
    if(req.session.user && req.cookies.user_sid) {
        res.redirect('/admin/dashboard');
    } else {
        next();
    }
};


let customSessionChecker = (req, res, next) => {
    if(req.session.user && req.cookies.user_sid) {
        next();
    } else {
        res.redirect('/admin/login');
    }
};


router.get('/', sessionChecker, (req, res) => {
    res.redirect('/admin/login')
});

router.get('/dashboard', customSessionChecker, (req, res) => {

    Order.find({"status": "TREATING"})
        .sort({created_at: -1})
        .populate('table')
        .then(orders => {
            Delivery.find({"status": "TREATING"})
            .sort({created_at: -1})
            .populate('restaurant')
            .then(deliveries => {
                res.render('index', {orders: orders.slice(0, 5), deliveries: deliveries.slice(0, 5), user: req.session.user});
            }).catch(error => {
                console.log(error);
            });
        }).catch(error => {
            console.log(error);
        });
    
});

// CRUD Users

router.get('/users', customSessionChecker, userController.getUsers);

router.get('/users/create', customSessionChecker, (req, res) => {
    Restaurant.find({})
        .then(restaurants => {
            res.render('users/create', {restaurants: restaurants, user: req.session.user});
        });
});

router.get('/users/:id', customSessionChecker, userController.getUser)

router.post('/users/', customSessionChecker, upload.single('picture'), authenticationController.register);

router.put('/users/:id', customSessionChecker, upload.single('picture'), userController.updateUser);

router.delete('/users/:id', customSessionChecker, userController.deleteUser);



// CRUD Restaurants

router.get('/restaurants', customSessionChecker, restaurantController.getRestaurants);


router.get('/restaurants/create', customSessionChecker, (req, res) => {
    res.render('restaurants/create', {user: req.session.user});
});


router.get('/restaurants/:id', customSessionChecker, restaurantController.getRestaurant)

router.post('/restaurants/', customSessionChecker, restaurantController.addRestaurant);

router.put('/restaurants/:id', customSessionChecker, restaurantController.updateRestaurant);

router.delete('/restaurants/:id', customSessionChecker, restaurantController.deleteRestaurant);

// CRUD Orders

router.get('/orders', customSessionChecker, orderController.getOrders);

router.get('/orders/create', customSessionChecker, (req, res) => {
    Table.find({})
        .then(tables => {
            Food.find({})
                .then(foods => {
                    res.render('orders/create', {user: req.session.user, tables: tables, foods: foods});
                })
        })
});

router.get('/orders/:id', customSessionChecker, orderController.getOrder)

router.post('/orders/', customSessionChecker, orderController.addOrder);

router.put('/orders/:id', customSessionChecker, orderController.updateOrder);

router.delete('/orders/:id', customSessionChecker, orderController.deleteOrder);


// CRUD Deliveries

router.get('/deliveries', customSessionChecker, deliveryController.getDeliveries);

router.get('/deliveries/create', customSessionChecker, (req, res) => {
        Restaurant.find({})
        .then(restaurants => {
            Food.find({})
                .then(foods => {
                    res.render('deliveries/create', {user: req.session.user, restaurants: restaurants, foods: foods});
                })
        })
});


router.get('/deliveries/:id', customSessionChecker, deliveryController.getDelivery)

router.post('/deliveries/', customSessionChecker, deliveryController.addDelivery);

router.put('/deliveries/:id', customSessionChecker, deliveryController.updateDelivery);

router.delete('/deliveries/:id', customSessionChecker, deliveryController.deleteDelivery);

// CRUD Additions

router.get('/additions', customSessionChecker, additionController.getAdditions);

router.get('/additions/create', customSessionChecker, (req, res) => {
    Table.find({})
        .then(tables => {
             res.render('additions/create', {user: req.session.user, tables: tables});
        })
});

router.get('/additions/:id', customSessionChecker, additionController.getAddition)

router.post('/additions/', customSessionChecker, additionController.addAddition);

router.put('/additions/:id', customSessionChecker, additionController.updateAddition);

router.delete('/additions/:id', customSessionChecker, additionController.deleteAddition);

// CRUD Tables

router.get('/tables', customSessionChecker, tableController.getTables);

router.get('/tables/create', customSessionChecker, (req, res) => {
    Restaurant.find({})
        .then(restaurants => {
            res.render('tables/create', {user: req.session.user, restaurants: restaurants});
        })
});

router.get('/restaurant/:restaurantId/table/:id', customSessionChecker, tableController.getTable)

router.post('/tables/', customSessionChecker, tableController.addTable);

router.put('/tables/:id', customSessionChecker, tableController.updateTable);

router.delete('/tables/:id', customSessionChecker, tableController.deleteTable);

// CRUD Categories

router.get('/categories', customSessionChecker, categoryController.getCategories);

router.get('/categories/create', customSessionChecker, (req, res) => {
    Restaurant.find({})
    .then(restaurants => {
        res.render('categories/create', {user: req.session.user, restaurants: restaurants});
    })
});

router.get('/categories/:id', customSessionChecker, categoryController.getCategory);

router.post('/categories/', customSessionChecker, upload.single('image'), categoryController.addCategory);

router.put('/categories/:id', customSessionChecker, upload.single('image'), categoryController.updateCategory);

router.delete('/categories/:id', customSessionChecker, categoryController.deleteCategory);


// CRUD Foods

router.get('/foods', customSessionChecker, foodController.getFoods);

router.get('/foods/create', customSessionChecker, (req, res) => {
    Category.find({})
        .then(categories => {
            res.render('foods/create', {user: req.session.user, categories: categories});
        })
});

router.get('/foods/:id', customSessionChecker, foodController.getFood)

router.post('/foods/', customSessionChecker, upload.single('image'), foodController.addFood);

router.put('/foods/:id', customSessionChecker, upload.single('image'), foodController.updateFood);

router.delete('/foods/:id', customSessionChecker, foodController.deleteFood);


// Authentication

router.get('/login', sessionChecker, (req, res) => {
    res.render('authentication/login', {error: null});
})

router.post('/login/', authenticationController.login);

router.get('/logout', authenticationController.logout);


module.exports = router;