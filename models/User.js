const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    email: {
        type: String,
    },
    staff_id: {
        type: String,
    },
    password: {
        type: String,
    },
    avatar: {
        data: Buffer,
        contentType: String
    },
    admin: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;