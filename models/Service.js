const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    servicestatus: {
        type: Boolean,
        default: false,
    },
    featuredimg: {
        type: String,
    },
    servicetitle: {
        type: String,
        required: true,
    },
    servicelink: {
        type: String,
    },
    menuname: {
        type: String,
    },
    servicesubt: {
        type: String,
    },
    servicedetails: {
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

module.exports = Service = mongoose.model('service', ServiceSchema);
