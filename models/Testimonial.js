const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TestimonialSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    testimonialstatus: {
        type: Boolean,
        default: false,
    },
    testimonialtitle: {
        type: String,
        required: true,
    },
    testimonialcat: {
        type: [],
        required: true,
    },
    testimonialbody: {
        type: String,
        required: true,
    },
    name: {
        type: String,
    },
    lastname: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = Testimonial = mongoose.model('testimonial', TestimonialSchema);
