const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RestaurantSchema = Schema({
    name: {
        type: String,
        required: true
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    categories: [{
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }],
    tables: [{
        type: Schema.Types.ObjectId,
        ref: 'Table'
    }],
    deliveries: [{
        type: Schema.Types.ObjectId,
        ref: 'Delivery'
    }],
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = Restaurant = mongoose.model('Restaurant', RestaurantSchema);