const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoticiasSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    newsstatus: {
        type: Boolean,
        default: false,
    },
    featuredimg: {
        type: String,
    },
    newstitle: {
        type: String,
        required: true,
    },
    newslink: {
        type: String,
    },
    newsintro: {
        type: String,
        required: true,
    },
    newscontent: {
        type: String,
        required: true,
    },
    newscat: {
        type: [],
        required: true,
    },
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

module.exports = Noticias = mongoose.model('noticia', NoticiasSchema);
