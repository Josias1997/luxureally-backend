const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CategorySchema = Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant',
    },
    foods: [{
        type: Schema.Types.ObjectId,
        ref: 'Food'
    }],
    created_at: {
        type: Date,
        default: Date.now
    },
});

module.exports = Category = mongoose.model('Category', CategorySchema);