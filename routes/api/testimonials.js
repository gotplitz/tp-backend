const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Testimonial = require('../../models/Testimonial');
const User = require('../../models/User');

// @route       POST api/testimonials
// @description Create a testimonial
// @access      Private
router.post(
    '/',
    [
        auth,
        [
            check('testimonialtitle', 'Title is required').not().isEmpty(),
            check('testimonialbody', 'Location is required').not().isEmpty(),
            check('testimonialcat', 'Please pick at least one category')
                .not()
                .isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const user = await User.findById(req.user.id).select('-password');

            const newTestimonial = new Testimonial({
                testimonialstatus: req.body.testimonialstatus,
                testimonialtitle: req.body.testimonialtitle,
                testimonialcat: req.body.testimonialcat,
                testimonialbody: req.body.testimonialbody,
                name: user.name,
                lastname: user.lastname,
                user: req.user.id,
            });

            const testimonial = await newTestimonial.save();

            res.json(testimonial);
        } catch (err) {
            console.error(err.messsage);
            res.status(500).send('Server Error in testimonial creation');
        }
    }
);

// @route       PUT api/testimonials/update/:id
// @description Update Testimonial
// @access      Private
router.put('/update/:id', auth, async (req, res) => {
    const {
        testimonialstatus,
        testimonialtitle,
        testimonialcat,
        testimonialbody,
        name,
        lastname,
    } = req.body;

    const testimonialFields = {};
    if (testimonialstatus === true) {
        testimonialFields.testimonialstatus = true;
    } else {
        testimonialFields.testimonialstatus = false;
    }
    if (testimonialtitle) testimonialFields.testimonialtitle = testimonialtitle;
    if (testimonialcat) testimonialFields.testimonialcat = testimonialcat;
    if (testimonialbody) testimonialFields.testimonialbody = testimonialbody;
    if (name) testimonialFields.name = name;
    if (lastname) testimonialFields.lastname = lastname;

    try {
        let testimonial = await Testimonial.findById(req.params.id);

        if (!testimonial) {
            return res.status(404).json({ msg: 'Service Item Not Found' });
        }

        testimonial = await Testimonial.findByIdAndUpdate(
            req.params.id,
            { $set: testimonialFields },
            { new: true }
        );

        res.json(testimonial);
    } catch (err) {
        console.error(err.messsage);
        res.status(500).send('Server Error in news creation');
    }
});

// @route       GET api/testimonials
// @description Get all testimonials
// @access      Public
router.get('/', async (req, res) => {
    try {
        const testimonials = await Testimonial.find().sort({ date: -1 });
        res.json(testimonials);
    } catch (err) {
        console.error(err.messsage);
        res.status(500).send('Server Error getting testimonials');
    }
});

// @route       DELETE api/testimonials/:id
// @description Delete a testimonial
// @access      Public
router.delete('/:id', auth, async (req, res) => {
    try {
        const testimonial = await Testimonial.findById(req.params.id);

        if (!testimonial) {
            return res.status(404).json({ msg: ' Testimonial not found' });
        }

        // Check user
        if (req.user.userrole === 'editor') {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await testimonial.remove();

        res.json({ msg: 'Testimonial Removed' });
    } catch (err) {
        console.error(err.messsage);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: ' Testimonial not found' });
        }
        res.status(500).send('Server Error deleting testimonials');
    }
});

module.exports = router;
