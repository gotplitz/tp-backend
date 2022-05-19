const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Promo = require('../../models/Promo');

// @route       POST api/promos
// @description Create a promo
// @access      Private
router.post(
    '/',
    [
        auth,
        [
            check('order', 'Please add the order number').not().isEmpty(),
            check('img', 'Please add a promo background').not().isEmpty(),
            check('title', 'Please add the title').not().isEmpty(),
            check('amount', 'Please add a amount').not().isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { order, img, title, expiration, amount } = req.body;

        let promo = await Promo.findOne({ title });

        if (promo) {
            return res
                .status(400)
                .json({ msg: 'There is a promo with the same name' });
        }

        try {
            const newPromo = new Promo({
                order,
                img,
                title,
                amount,
                expiration,
            });

            const promo = await newPromo.save();

            res.json(promo);
        } catch (err) {
            console.error(err.messsage);
            res.status(500).send('Server Error in promo creation');
        }
    }
);

// @route       PUT api/promos/update/:id
// @description Update Promo
// @access      Private
router.put('/update/:id', auth, async (req, res) => {
    const { order, img, title, expiration, amount } = req.body;

    const promoFields = {};
    if (order) promoFields.order = order;
    if (img) promoFields.img = img;
    if (title) promoFields.title = title;
    if (amount) promoFields.amount = amount;
    if (expiration) promoFields.expiration = expiration;

    try {
        let promo = await Promo.findById(req.params.id);

        if (!promo) {
            return res.status(404).json({ msg: 'Promo Item Not Found' });
        }

        promo = await Promo.findByIdAndUpdate(
            req.params.id,
            { $set: promoFields },
            { new: true }
        );

        res.json(promo);
    } catch (err) {
        console.error(err.messsage);
        res.status(500).send('Server Error in promo creation');
    }
});

// @route       GET api/promos
// @description Get all promos
// @access      Public
router.get('/', async (req, res) => {
    try {
        const promos = await Promo.find().sort({ order: -1 });
        res.json(promos);
    } catch (err) {
        console.error(err.messsage);
        res.status(500).send('Server Error getting promos');
    }
});

// @route       DELETE api/promos/:id
// @description Delete a promo
// @access      Public
router.delete('/:id', auth, async (req, res) => {
    try {
        const promo = await Promo.findById(req.params.id);

        if (!promo) {
            return res.status(404).json({ msg: ' Promo not found' });
        }

        await promo.remove();

        res.json({ msg: 'Promo Removed' });
    } catch (err) {
        console.error(err.messsage);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: ' Promo not found' });
        }
        res.status(500).send('Server Error deleting promos');
    }
});

module.exports = router;
