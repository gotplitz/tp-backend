const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    departments: {
        type: [],
    },
    title: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
    },
    skills: {
        type: [String],
    },
    certifications: {
        type: [String],
    },
    social: {
        linkedin: {
            type: String,
        },
        twitter: {
            type: String,
        },
        facebook: {
            type: String,
        },
        instagram: {
            type: String,
        },
    },
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
