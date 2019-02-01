const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: {
      first: {
          type: String,
          required: true
      },
      last: {
          type: String,
          required: true
      }
  },
    staffEmail: {
        type: String,
        required: true
    },
    staffID: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        data: Buffer,
        contentType: String,
    },
    admin: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;