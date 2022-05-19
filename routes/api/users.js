const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const nodemailer = require('nodemailer');
const { check, validationResult, Result } = require('express-validator');
const auth = require('../../middleware/auth');
const crypto = require('crypto');

const User = require('../../models/User');

// @route       POST api/users
// @description Register route
// @access      Public
router.post(
    '/',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('lastname', 'Last Name is required').not().isEmpty(),
        check('phone', 'Phone Number is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check(
            'password',
            'Please enter a password with 6 or more character'
        ).isLength({ min: 6 }),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            verified,
            userrole,
            name,
            lastname,
            phone,
            email,
            password,
            photo,
        } = req.body;

        try {
            let user = await User.findOne({ email });

            if (user) {
                return res.status(400).json({ msg: 'User already exists' });
            }

            user = new User({
                verified,
                userrole,
                name,
                lastname,
                phone,
                email,
                password,
                photo,
            });

            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                user: {
                    id: user.id,
                },
            };

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: 3600000 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route       POST api/users
// @description Udate user info
// @access      Private
router.put('/', auth, async (req, res) => {
    const { name, lastname, phone, email, photo } = req.body;

    const userFields = {};
    if (name) userFields.name = name;
    if (lastname) userFields.lastname = lastname;
    if (phone) userFields.phone = phone;
    if (email) userFields.email = email;
    if (photo) userFields.photo = photo;

    try {
        let user = await User.findById(req.user.id).select('-password');

        if (user.id.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        user = await User.findByIdAndUpdate(req.user.id, { $set: userFields });

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route       POST api/users
// @description Cange Password
// @access      Private
router.put(
    '/change',
    auth,
    [
        check(
            'password',
            'Please enter a password with 6 or more character'
        ).isLength({ min: 6 }),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { password } = req.body;

        const userFields = {};
        if (password) userFields.password = password;

        try {
            let user = await User.findById(req.user.id);

            if (user.id.toString() !== req.user.id) {
                return res.status(401).json({ msg: 'Not authorized' });
            }

            const salt = await bcrypt.genSalt(10);

            userFields.password = await bcrypt.hash(password, salt);

            user = await User.findByIdAndUpdate(req.user.id, {
                $set: userFields,
            });

            res.json(user);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route       POST api/users/reset
// @description Reset password
// @access      Private
router.post('/reset', async (req, res) => {
    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            console.log(err);
        }

        const token = buffer.toString('hex');
        User.findOne({ email: req.body.email }).then((user) => {
            if (!user) {
                return res
                    .status(422)
                    .json({ error: 'User does not exist with that email' });
            }

            user.resetToken = token;
            user.expireToken = Date.now() + 3600000;
            user.save().then((result) => {
                let transporter = nodemailer.createTransport({
                    host: 'mail.plitz.website',
                    port: 465,
                    secure: true,
                    auth: {
                        user: 'hello@plitz.website',
                        pass: 'Megan2302$',
                    },
                    tls: {
                        rejectUnauthorized: false,
                    },
                });
            });
        });
    });
});

module.exports = router;
