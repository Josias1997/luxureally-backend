const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['super_admin', 'manager'],
        default: 'manager'
    },
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant'
    },
    token: {
        type: String,
        default: null
    },
    picture: {
        type: String,
        default: null,
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('User', UserSchema);