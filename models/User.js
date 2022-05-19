const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    verified: {
        type: Boolean,
        default: false,
    },
    userrole: {
        type: String,
    },
    name: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    resetToken: {
        type: String,
    },
    expireToken: {
        type: Date,
    },
    photo: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = User = mongoose.model('user', UserSchema);
