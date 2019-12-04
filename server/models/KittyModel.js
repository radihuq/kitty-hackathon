const mongoose = require('mongoose');

const KittySchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    creator: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    type: {
        type: String
    },
    description: {
        type: String
    },
    optout: {
        type: Number
    },
    amount: {
        type: Number
    },
    paymentfrequency: {
        type: Number
    },
    data: {
        groups: []
    },
    users: [],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Kitty', KittySchema);