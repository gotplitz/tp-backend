const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Location = require('../../models/Location');
const User = require('../../models/User');

// @route       POST api/locations
// @description Create a location
// @access      Private
router.post(
    '/',
    [auth, [check('locationtitle', 'Title is required').not().isEmpty()]],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const user = await User.findById(req.user.id).select('-password');

            const newLocation = new Location({
                locationstatus: req.body.locationstatus,
                featuredimg: req.body.featuredimg,
                locationtitle: req.body.locationtitle,
                locationlink: req.body.locationlink,
                locationsubt: req.body.locationsubt,
                locationdetails: req.body.locationdetails,
                extraboxes: req.body.extraboxes,
                photo: user.photo,
                name: user.name,
                lastname: user.lastname,
                user: req.user.id,
            });

            const location = await newLocation.save();

            res.json(location);
        } catch (err) {
            console.error(err.messsage);
            res.status(500).send('Server Error in location creation');
        }
    }
);

// @route       PUT api/locations/update/:id
// @description Update Location
// @access      Private
router.put('/update/:id', auth, async (req, res) => {
    const {
        locationstatus,
        featuredimg,
        locationtitle,
        locationlink,
        locationsubt,
        locationdetails,
        extraboxes,
        photo,
        name,
        lastname,
    } = req.body;

    const locationFields = {};
    if (locationstatus === true) {
        locationFields.locationstatus = true;
    } else {
        locationFields.locationstatus = false;
    }
    if (featuredimg) locationFields.featuredimg = featuredimg;
    if (locationtitle) locationFields.locationtitle = locationtitle;
    if (locationlink) locationFields.locationlink = locationlink;
    if (locationsubt) locationFields.locationsubt = locationsubt;
    if (locationdetails) locationFields.locationdetails = locationdetails;
    if (extraboxes) locationFields.extraboxes = extraboxes;
    if (photo) locationFields.photo = photo;
    if (name) locationFields.name = name;
    if (lastname) locationFields.lastname = lastname;

    try {
        let location = await Location.findById(req.params.id);

        if (!location) {
            return res.status(404).json({ msg: 'Location Item Not Found' });
        }

        location = await Location.findByIdAndUpdate(
            req.params.id,
            { $set: locationFields },
            { new: true }
        );

        res.json(location);
    } catch (err) {
        console.error(err.messsage);
        res.status(500).send('Server Error in news creation');
    }
});

// @route       GET api/locations
// @description Get all locations
// @access      Public
router.get('/', async (req, res) => {
    try {
        const locations = await Location.find().sort({ date: -1 });
        res.json(locations);
    } catch (err) {
        console.error(err.messsage);
        res.status(500).send('Server Error getting locations');
    }
});

// @route       GET api/locations/:locationlink
// @description Get location by Link
// @access      Public
router.get('/:locationlink', async (req, res) => {
    try {
        const location = await Location.findOne({
            locationlink: req.params.locationlink,
        }).populate('location');

        if (!location) {
            return res.status(404).json({ msg: 'Location Not Found' });
        }

        res.json(location);
    } catch (err) {
        console.error(err.messsage);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Location Not Found' });
        }
        res.status(500).send('Server Error getting locations');
    }
});

// @route       DELETE api/locations/:id
// @description Delete a location
// @access      Public
router.delete('/:id', auth, async (req, res) => {
    try {
        const location = await Location.findById(req.params.id);

        if (!location) {
            return res.status(404).json({ msg: ' Location not found' });
        }

        await location.remove();

        res.json({ msg: 'Location Removed' });
    } catch (err) {
        console.error(err.messsage);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: ' Location not found' });
        }
        res.status(500).send('Server Error deleting locations');
    }
});

module.exports = router;
