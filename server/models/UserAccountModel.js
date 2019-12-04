const mongoose = require('mongoose');

const UserAccountSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number
    },
    data: {
        groups: []
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('KittyUserAccount', UserAccountSchema);