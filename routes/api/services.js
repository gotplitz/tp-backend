const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Service = require('../../models/Service');
const User = require('../../models/User');

// @route       POST api/services
// @description Create a service
// @access      Private
router.post(
    '/',
    [auth, [check('servicetitle', 'Title is required').not().isEmpty()]],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            servicestatus,
            featuredimg,
            servicetitle,
            servicelink,
            menuname,
            servicesubt,
            servicedetails,
            extraboxes,
            gallery,
            photo,
            name,
            lastname,
        } = req.body;

        const user = await User.findById(req.user.id).select('-password');

        const newService = {};
        newService.photo = user.photo;
        newService.name = user.name;
        newService.lastname = user.lastname;
        newService.user = req.user.id;

        if (servicestatus === true) {
            newService.servicestatus = true;
        } else {
            newService.servicestatus = false;
        }
        if (featuredimg) newService.featuredimg = featuredimg;
        if (servicetitle) newService.servicetitle = servicetitle;
        if (servicelink) newService.servicelink = servicelink;
        if (menuname) newService.menuname = menuname;
        if (servicesubt) newService.servicesubt = servicesubt;
        if (servicedetails) newService.servicedetails = servicedetails;
        if (extraboxes) newService.extraboxes = extraboxes;
        if (gallery) newService.gallery = gallery;
        if (photo) newService.photo = photo;
        if (name) newService.name = name;
        if (lastname) newService.lastname = lastname;

        try {
            const service = new Service(newService);

            const finalservice = await service.save();

            res.json(finalservice);
        } catch (err) {
            console.error(err.messsage);
            res.status(500).send('Server Error in service creation');
        }
    }
);

// @route       PUT api/services/update/:id
// @description Update Service
// @access      Private
router.put('/update/:id', auth, async (req, res) => {
    const {
        servicestatus,
        featuredimg,
        servicetitle,
        servicelink,
        menuname,
        servicesubt,
        servicedetails,
        extraboxes,
        gallery,
        photo,
        name,
        lastname,
    } = req.body;

    const serviceFields = {};
    if (servicestatus === true) {
        serviceFields.servicestatus = true;
    } else {
        serviceFields.servicestatus = false;
    }
    if (featuredimg) serviceFields.featuredimg = featuredimg;
    if (servicetitle) serviceFields.servicetitle = servicetitle;
    if (servicelink) serviceFields.servicelink = servicelink;
    if (menuname) serviceFields.menuname = menuname;
    if (servicesubt) serviceFields.servicesubt = servicesubt;
    if (servicedetails) serviceFields.servicedetails = servicedetails;
    if (extraboxes) serviceFields.extraboxes = extraboxes;
    if (gallery) serviceFields.gallery = gallery;
    if (photo) serviceFields.photo = photo;
    if (name) serviceFields.name = name;
    if (lastname) serviceFields.lastname = lastname;

    try {
        let service = await Service.findById(req.params.id);

        if (!service) {
            return res.status(404).json({ msg: 'Service Item Not Found' });
        }

        service = await Service.findByIdAndUpdate(
            req.params.id,
            { $set: serviceFields },
            { new: true }
        );

        res.json(service);
    } catch (err) {
        console.error(err.messsage);
        res.status(500).send('Server Error in news creation');
    }
});

// @route       GET api/services
// @description Get all services
// @access      Public
router.get('/', async (req, res) => {
    try {
        const services = await Service.find().sort({ date: -1 });
        res.json(services);
    } catch (err) {
        console.error(err.messsage);
        res.status(500).send('Server Error getting services');
    }
});

// @route       GET api/services/:servicelink
// @description Get service by Link
// @access      Public
router.get('/:servicelink', async (req, res) => {
    try {
        const service = await Service.findOne({
            servicelink: req.params.servicelink,
        }).populate('service');

        if (!service) {
            return res.status(404).json({ msg: 'Service Not Found' });
        }

        res.json(service);
    } catch (err) {
        console.error(err.messsage);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Service Not Found' });
        }
        res.status(500).send('Server Error getting services');
    }
});

// @route       DELETE api/services/:id
// @description Delete a service
// @access      Public
router.delete('/:id', auth, async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);

        if (!service) {
            return res.status(404).json({ msg: ' Service not found' });
        }

        await service.remove();

        res.json({ msg: 'Service Removed' });
    } catch (err) {
        console.error(err.messsage);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: ' Service not found' });
        }
        res.status(500).send('Server Error deleting services');
    }
});

module.exports = router;
