const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SliderSchema = new Schema({
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
    subtitle: {
        type: String,
    },
    btnone: {
        type: String,
    },
    btnlone: {
        type: String,
    },
    btntwo: {
        type: String,
    },
    btnltwo: {
        type: String,
    },
    moredetails: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = Slider = mongoose.model('slider', SliderSchema);
