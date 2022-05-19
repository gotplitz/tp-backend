const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Slider = require('../../models/Slider');

// @route       POST api/sliders
// @description Create a slider
// @access      Private
router.post(
    '/',
    [
        auth,
        [
            check('order', 'Please add the order number').not().isEmpty(),
            check('img', 'Please add a slider background').not().isEmpty(),
            check('title', 'Please add the title').not().isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            order,
            img,
            title,
            subtitle,
            moredetails,
            btnone,
            btnlone,
            btntwo,
            btnltwo,
        } = req.body;

        let slider = await Slider.findOne({ order });

        if (slider) {
            return res
                .status(400)
                .send('Only one slider is allowed with this order number');
        }

        try {
            const newSlider = new Slider({
                order,
                img,
                title,
                subtitle,
                btnone,
                btnlone,
                btntwo,
                btnltwo,
                moredetails,
            });

            const slider = await newSlider.save();

            res.json(slider);
        } catch (err) {
            console.error(err.messsage);
            res.status(500).send('Server Error in slider creation');
        }
    }
);

// @route       PUT api/sliders/update/:id
// @description Update Slider
// @access      Private
router.put('/update/:id', auth, async (req, res) => {
    const {
        order,
        img,
        title,
        subtitle,
        moredetails,
        btnone,
        btnlone,
        btntwo,
        btnltwo,
    } = req.body;

    const sliderFields = {};
    if (order) sliderFields.order = order;
    if (img) sliderFields.img = img;
    if (title) sliderFields.title = title;
    if (subtitle) sliderFields.subtitle = subtitle;
    if (btnone) sliderFields.btnone = btnone;
    if (btnlone) sliderFields.btnlone = btnlone;
    if (btntwo) sliderFields.btntwo = btntwo;
    if (btnltwo) sliderFields.btnltwo = btnltwo;
    if (moredetails) sliderFields.moredetails = moredetails;

    try {
        let slider = await Slider.findById(req.params.id);

        if (!slider) {
            return res.status(404).json({ msg: 'Slider Item Not Found' });
        }

        slider = await Slider.findByIdAndUpdate(
            req.params.id,
            { $set: sliderFields },
            { new: true }
        );

        res.json(slider);
    } catch (err) {
        console.error(err.messsage);
        res.status(500).send('Server Error in slider creation');
    }
});

// @route       GET api/sliders
// @description Get all sliders
// @access      Public
router.get('/', async (req, res) => {
    try {
        const sliders = await Slider.find().sort({ order: -1 });
        res.json(sliders);
    } catch (err) {
        console.error(err.messsage);
        res.status(500).send('Server Error getting sliders');
    }
});

// @route       DELETE api/sliders/:id
// @description Delete a slider
// @access      Public
router.delete('/:id', auth, async (req, res) => {
    try {
        const slider = await Slider.findById(req.params.id);

        if (!slider) {
            return res.status(404).json({ msg: ' Slider not found' });
        }

        await slider.remove();

        res.json({ msg: 'Slider Removed' });
    } catch (err) {
        console.error(err.messsage);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: ' Slider not found' });
        }
        res.status(500).send('Server Error deleting sliders');
    }
});

module.exports = router;
