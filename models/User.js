const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
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
    administrator: {
        type: String,
        required: True,
    },
    img: {
        data: Buffer,
        contentType: String
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;