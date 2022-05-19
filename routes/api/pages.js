const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Page = require('../../models/Page');
const User = require('../../models/User');

// @route       POST api/pages
// @description Create a page
// @access      Private
router.post(
    '/',
    [auth, [check('pagetitle', 'Title is required').not().isEmpty()]],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            pagestatus,
            featuredimg,
            pagetitle,
            pagelink,
            menuname,
            pagesubt,
            pagedetails,
            extraboxes,
            gallery,
            photo,
            name,
            lastname,
        } = req.body;

        const user = await User.findById(req.user.id).select('-password');

        const newPage = {};
        newPage.photo = user.photo;
        newPage.name = user.name;
        newPage.lastname = user.lastname;
        newPage.user = req.user.id;

        if (pagestatus === true) {
            newPage.pagestatus = true;
        } else {
            newPage.pagestatus = false;
        }
        if (featuredimg) newPage.featuredimg = featuredimg;
        if (pagetitle) newPage.pagetitle = pagetitle;
        if (pagelink) newPage.pagelink = pagelink;
        if (menuname) newPage.menuname = menuname;
        if (pagesubt) newPage.pagesubt = pagesubt;
        if (pagedetails) newPage.pagedetails = pagedetails;
        if (extraboxes) newPage.extraboxes = extraboxes;
        if (gallery) newPage.gallery = gallery;
        if (photo) newPage.photo = photo;
        if (name) newPage.name = name;
        if (lastname) newPage.lastname = lastname;

        try {
            const page = new Page(newPage);

            const finalpage = await page.save();

            res.json(finalpage);
        } catch (err) {
            console.error(err.messsage);
            res.status(500).send('Server Error in page creation');
        }
    }
);

// @route       PUT api/pages/update/:id
// @description Update Page
// @access      Private
router.put('/update/:id', auth, async (req, res) => {
    const {
        pagestatus,
        featuredimg,
        pagetitle,
        pagelink,
        menuname,
        pagesubt,
        pagedetails,
        extraboxes,
        gallery,
        photo,
        name,
        lastname,
    } = req.body;

    const pageFields = {};
    if (pagestatus === true) {
        pageFields.pagestatus = true;
    } else {
        pageFields.pagestatus = false;
    }
    if (featuredimg) pageFields.featuredimg = featuredimg;
    if (pagetitle) pageFields.pagetitle = pagetitle;
    if (pagelink) pageFields.pagelink = pagelink;
    if (menuname) pageFields.menuname = menuname;
    if (pagesubt) pageFields.pagesubt = pagesubt;
    if (pagedetails) pageFields.pagedetails = pagedetails;
    if (extraboxes) pageFields.extraboxes = extraboxes;
    if (gallery) pageFields.gallery = gallery;
    if (photo) pageFields.photo = photo;
    if (name) pageFields.name = name;
    if (lastname) pageFields.lastname = lastname;

    try {
        let page = await Page.findById(req.params.id);

        if (!page) {
            return res.status(404).json({ msg: 'Page Item Not Found' });
        }

        page = await Page.findByIdAndUpdate(
            req.params.id,
            { $set: pageFields },
            { new: true }
        );

        res.json(page);
    } catch (err) {
        console.error(err.messsage);
        res.status(500).send('Server Error in news creation');
    }
});

// @route       GET api/pages
// @description Get all pages
// @access      Public
router.get('/', async (req, res) => {
    try {
        const pages = await Page.find().sort({ date: -1 });
        res.json(pages);
    } catch (err) {
        console.error(err.messsage);
        res.status(500).send('Server Error getting pages');
    }
});

// @route       GET api/pages/:pagelink
// @description Get page by Link
// @access      Public
router.get('/:pagelink', async (req, res) => {
    try {
        const page = await Page.findOne({
            pagelink: req.params.pagelink,
        }).populate('page');

        if (!page) {
            return res.status(404).json({ msg: 'Page Not Found' });
        }

        res.json(page);
    } catch (err) {
        console.error(err.messsage);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Page Not Found' });
        }
        res.status(500).send('Server Error getting pages');
    }
});

// @route       DELETE api/pages/:id
// @description Delete a page
// @access      Public
router.delete('/:id', auth, async (req, res) => {
    try {
        const page = await Page.findById(req.params.id);

        if (!page) {
            return res.status(404).json({ msg: ' Page not found' });
        }

        await page.remove();

        res.json({ msg: 'Page Removed' });
    } catch (err) {
        console.error(err.messsage);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: ' Page not found' });
        }
        res.status(500).send('Server Error deleting pages');
    }
});

module.exports = router;
