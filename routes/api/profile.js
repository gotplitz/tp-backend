const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route       GET api/profile/me
// @description Get current user's profile
// @access      Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.user.id,
        }).populate('user', [
            'userrole',
            'name',
            'lastname',
            'phone',
            'email',
            'photo',
            'date',
        ]);

        if (!profile) {
            return res
                .status(400)
                .json({ msg: 'There is no profile for this user' });
        }

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error, Cannot get profile');
    }
});

// @route       POST api/profile
// @description Create or update user profile
// @access      Private
router.post(
    '/',
    [auth, [check('title', 'Please add title').not().isEmpty()]],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            departments,
            title,
            bio,
            skills,
            certifications,
            vcffile,
            linkedin,
            twitter,
            instagram,
            facebook,
        } = req.body;

        // Location profile object
        const profileFields = {};
        profileFields.user = req.user.id;
        if (departments) {
            profileFields.departments = departments.map((departments) =>
                departments.trim()
            );
        }

        if (skills) {
            profileFields.skills = skills
                .split(',')
                .map((skills) => skills.trim());
        }
        if (title) profileFields.title = title;
        if (bio) profileFields.bio = bio;
        if (skills) {
            profileFields.skills = skills
                .split(',')
                .map((skills) => skills.trim());
        }
        if (certifications) {
            profileFields.certifications = certifications
                .split(',')
                .map((certifications) => certifications.trim());
        }
        if (vcffile) profileFields.vcffile = vcffile;

        // Location Social object
        profileFields.social = {};

        if (linkedin) profileFields.social.linkedin = linkedin;
        if (twitter) profileFields.social.twitter = twitter;
        if (facebook) profileFields.social.facebook = facebook;
        if (instagram) profileFields.social.instagram = instagram;

        try {
            let profile = await Profile.findOne({ user: req.user.id });

            if (profile) {
                // Update profile
                profile = await Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profileFields },
                    { new: true }
                );

                return res.json(profile);
            }

            // Create Profile
            profile = new Profile(profileFields);

            await profile.save();
            res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route       GET api/profile
// @description Get all profiles
// @access      Public
router.get('/', auth, async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', [
            'userrole',
            'name',
            'lastname',
            'phone',
            'email',
            'photo',
            'date',
        ]);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route       GET api/profile/user/:user_id
// @description Get profile by user ID
// @access      Private
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.params.user_id,
        }).populate('user', ['name', 'lastname', 'phone', 'email', 'photo']);

        if (!profile) return res.status(400).json({ msg: 'Profile not found' });

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Profile not found' });
        }
        res.status(500).send('Server Error');
    }
});

// @route       DELETE api/profile
// @description Delete profile, user & post
// @access      Private
router.delete('/', auth, async (req, res) => {
    try {
        //Remove profile
        await Profile.findOneAndRemove({ user: req.user.id });
        //Remove the user
        await User.findOneAndRemove({ _id: req.user.id });

        res.json({ msg: 'User deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
