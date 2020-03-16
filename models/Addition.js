const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdditionSchema = Schema({
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
        enum: ['PAID', 'NON PAID'],
        default: 'NON PAID',
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = Addition = mongoose.model('Addition', AdditionSchema);