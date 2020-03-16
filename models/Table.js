const mongoose = require('mongoose');
const cryptoJS = require('crypto-js');
const Schema = mongoose.Schema;

const TableSchema = Schema({
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant',
    },
    orders: [{
        type: Schema.Types.ObjectId,
        ref: 'Order',
        default: []
    }],
    additions: [{
        type: Schema.Types.ObjectId,
        ref: 'Addition',
        default: []
    }]
});

module.exports = Table = mongoose.model('Table', TableSchema);