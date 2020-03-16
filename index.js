const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const socketio = require('socket.io');
const cors = require('cors');
const http = require('http');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const methodOverride = require('method-override');
require('dotenv').config();
const config = require('./config/config');
const tables = require('./routes/api/tables');
const users = require('./routes/api/users');
const restaurants = require('./routes/api/restaurants');
const orders = require('./routes/api/orders');
const orderItems = require('./routes/api/orderItems');
const foods = require('./routes/api/foods');
const deliveries = require('./routes/api/deliveries');
const categories = require('./routes/api/categories');
const authentication = require('./routes/api/authentication');
const additions = require('./routes/api/additions');
const admin = require('./routes/admin/admin');
const path = require('path');
const fs = require('fs');
const cryptoJS = require('crypto-js');
const Delivery = require('./models/Delivery');
const Order = require('./models/Order');


const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(methodOverride('_method'));

// Set session middleware
app.use(session({
    key: 'user_sid',
    secret: toString(cryptoJS.SHA512(Math.random())),
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 3600000
    }
}));

// Check if cookie is still stored on client browser and user session is not defined than
// Automatically log the user out.
app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');
    }

    next();
});


// Serve static files
app.use(express.static('uploads'));
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'client', 'build')));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// Create server
const server = http.createServer(app);
const io = socketio(server);


console.log("MONGO", config.mongoURI);

// Connect to database
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
        console.log("Connected successfully");
    }).catch((err) => {
        console.log(err);
    })



// Initialise routes
app.use('/api/users', users);
app.use('/api/categories', categories);
app.use('/api/tables', tables);
app.use('/api/restaurants', restaurants);
app.use('/api/additions', additions);
app.use('/api/auth', authentication);
app.use('/api/deliveries', deliveries);
app.use('/api/foods', foods);
app.use('/api/orders', orders);
app.use('/api/orderItems', orderItems);
app.use('/admin', admin);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});


// Initialise sockets

io.on('connection', socket => {
    socket.on('addition asked', additionId => {
        Addition.findById(additionId)
            .then(addition => {
                socket.emit('addition', addition)
            }).catch(err => {
                console.log(err);
            })
    });

    socket.on('newOrder', order => {
        console.log(order);
        Order.findById(order._id)
            .populate('table')
            .then(order => {
                io.emit('new_order', order);
            });
    })

    socket.on('newDelivery', delivery => {
        Delivery.findById(delivery._id)
            .populate('restaurant')
            .then(delivery => {
                io.emit('new_delivery', delivery);
            });
    });
});


// Listen to server
server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});