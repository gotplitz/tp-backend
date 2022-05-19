const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    locationstatus: {
        type: Boolean,
        default: false,
    },
    featuredimg: {
        type: String,
    },
    locationtitle: {
        type: String,
        required: true,
    },
    locationlink: {
        type: String,
    },
    locationsubt: {
        type: String,
    },
    locationdetails: {
        type: String,
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

module.exports = Location = mongoose.model('location', LocationSchema);
