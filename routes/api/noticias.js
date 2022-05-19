const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Noticia = require('../../models/Noticia');
const User = require('../../models/User');

// @route       POST api/noticias
// @description Create a news
// @access      Private
router.post(
    '/',
    [
        auth,
        [
            check('newstitle', 'Title is required').not().isEmpty(),
            check('newsintro', 'Intro or excerpt is required').not().isEmpty(),
            check('newscontent', 'Content is required').not().isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const user = await User.findById(req.user.id).select('-password');

            const newNoticia = new Noticia({
                newsstatus: req.body.newsstatus,
                featuredimg: req.body.featuredimg,
                newstitle: req.body.newstitle,
                newslink: req.body.newslink,
                newscat: req.body.newscat,
                newsintro: req.body.newsintro,
                newscontent: req.body.newscontent,
                photo: user.photo,
                name: user.name,
                lastname: user.lastname,
                user: req.user.id,
            });

            const noticia = await newNoticia.save();

            res.json(noticia);
        } catch (err) {
            console.error(err.messsage);
            res.status(500).send('Server Error in noticia creation');
        }
    }
);

// @route       PUT api/noticias/:id
// @description Update Noticia
// @access      Private
router.put('/update/:id', auth, async (req, res) => {
    const {
        newsstatus,
        featuredimg,
        newstitle,
        newslink,
        newsintro,
        newscontent,
        newscat,
        name,
        lastname,
        photo,
    } = req.body;

    const newsFields = {};
    if (newsstatus === true) {
        newsFields.newsstatus = true;
    } else {
        newsFields.newsstatus = false;
    }
    if (featuredimg) newsFields.featuredimg = featuredimg;
    if (newstitle) newsFields.newstitle = newstitle;
    if (newslink) newsFields.newslink = newslink;
    if (newsintro) newsFields.newsintro = newsintro;
    if (newscontent) newsFields.newscontent = newscontent;
    if (newscat) newsFields.newscat = newscat;
    if (name) newsFields.name = name;
    if (lastname) newsFields.lastname = lastname;
    if (photo) newsFields.photo = photo;

    try {
        let noticia = await Noticia.findById(req.params.id);

        if (!noticia) {
            return res.status(404).json({ msg: 'Noticia Item Not Found' });
        }

        noticia = await Noticia.findByIdAndUpdate(
            req.params.id,
            { $set: newsFields },
            { new: true }
        );

        res.json(noticia);
    } catch (err) {
        console.error(err.messsage);
        res.status(500).send('Server Error in news creation');
    }
});

// @route       GET api/noticias
// @description Get all noticias
// @access      Public
router.get('/', async (req, res) => {
    try {
        const noticias = await Noticia.find().sort({ date: -1 });
        res.json(noticias);
    } catch (err) {
        console.error(err.messsage);
        res.status(500).send('Server Error getting noticias');
    }
});

// @route       GET api/noticia/:id
// @description Get noticia by ID
// @access      Public
router.get('/:newslink', async (req, res) => {
    try {
        const noticia = await Noticia.findOne({
            newslink: req.params.newslink,
        }).populate('noticia');

        if (!noticia) {
            return res.status(404).json({ msg: 'News Not Found' });
        }

        res.json(noticia);
    } catch (err) {
        console.error(err.messsage);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'News Not Found' });
        }
        res.status(500).send('Server Error getting news');
    }
});

// @route       DELETE api/noticias/:id
// @description Delete a noticia
// @access      Public
router.delete('/:id', auth, async (req, res) => {
    try {
        const noticia = await Noticia.findById(req.params.id);

        if (!noticia) {
            return res.status(404).json({ msg: 'News not found' });
        }

        // Check user
        if (noticia.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await noticia.remove();

        res.json({ msg: 'News Removed' });
    } catch (err) {
        console.error(err.messsage);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: ' News not found' });
        }
        res.status(500).send('Server Error deleting noticias');
    }
});

module.exports = router;
