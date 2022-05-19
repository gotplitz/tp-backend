const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    teamstatus: {
        type: Boolean,
        default: false,
    },
    featuredimg: {
        type: String,
    },
    teamtitle: {
        type: String,
        required: true,
    },
    teamlink: {
        type: String,
    },
    teamsubt: {
        type: String,
    },
    teamdetails: {
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

module.exports = Team = mongoose.model('team', TeamSchema);
