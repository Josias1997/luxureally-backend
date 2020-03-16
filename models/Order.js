const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = Schema({
    table: {
        type: Schema.Types.ObjectId,
        ref: 'Table',
        required: true
    },
    total_price: {
        type: Number,
        required: true
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
    order_items: {
        type: Array,
        default: []
    },
    created_at: {
        type: Date,
        default: Date.now
    },
});

module.exports = Order = mongoose.model('Order', OrderSchema);