const mongoose = require('mongoose');

const UsserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: True,
    },
    last_name: {
        type: String,
        required: True,
    },
    email: {
        type: String,
        required: True,
    },
    id: {
        type: String,
        required: True,
    },
    password: {
        type: String,
        required: True,
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;