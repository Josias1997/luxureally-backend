const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoodSchema = Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
});

module.exports = Food = mongoose.model('Food', FoodSchema);