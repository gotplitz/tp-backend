const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PageSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    pagestatus: {
        type: Boolean,
        default: false,
    },
    featuredimg: {
        type: String,
    },
    pagetitle: {
        type: String,
        required: true,
    },
    pagelink: {
        type: String,
    },
    menuname: {
        type: String,
        equired: true,
    },
    pagesubt: {
        type: String,
    },
    pagedetails: {
        type: String,
        required: true,
    },
    extraboxes: [
        {
            subtitle: {
                type: String,
            },
            order: {
                type: Number,
            },
            bodybox: {
                type: String,
            },
            img: {
                type: String,
            },
        },
    ],
    gallery: [
        {
            fileName: {
                type: String,
            },
        },
    ],
    name: {
        type: String,
    },
    lastname: {
        type: String,
    },
    photo: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = Page = mongoose.model('page', PageSchema);
