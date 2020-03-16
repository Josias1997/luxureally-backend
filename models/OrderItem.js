const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderItemSchema = Schema({
    food: {
        type: Schema.Types.ObjectId,
        ref: 'Food',
        required: true
    },
    order: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
    },
    quantity: {
        type: Number,
        required: true
    }
});

module.exports = OrderItem = mongoose.model('OrderItem', OrderItemSchema);