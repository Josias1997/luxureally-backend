const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeliverySchema = Schema({
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    total_price: {
        type: Number,
        required: true
    },
    order_items: {
        type: Array,
        default: []
    },
    status: {
        type: String,
        required: true,
        enum: ['TREATING', 'READY'],
        default: 'TREATING'
    },
    order_details: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = Delivery = mongoose.model('Delivery', DeliverySchema);