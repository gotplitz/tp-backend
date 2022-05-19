const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PromoSchema = new Schema({
    order: {
        type: Number,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    expiration: {
        type: String,
        required: true,
    },
    amount: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = Promo = mongoose.model('promo', PromoSchema);
