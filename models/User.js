const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    staffEmail: {
        type: String,
    },
    staffID: {
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