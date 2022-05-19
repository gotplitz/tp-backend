const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Team = require('../../models/Team');
const User = require('../../models/User');

// @route       POST api/teams
// @description Create a team
// @access      Private
router.post(
    '/',
    [auth, [check('teamtitle', 'Title is required').not().isEmpty()]],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const user = await User.findById(req.user.id).select('-password');

            const newTeam = new Team({
                teamstatus: req.body.teamstatus,
                featuredimg: req.body.featuredimg,
                teamtitle: req.body.teamtitle,
                teamlink: req.body.teamlink,
                teamsubt: req.body.teamsubt,
                teamdetails: req.body.teamdetails,
                extraboxes: req.body.extraboxes,
                photo: user.photo,
                name: user.name,
                lastname: user.lastname,
                user: req.user.id,
            });

            const team = await newTeam.save();

            res.json(team);
        } catch (err) {
            console.error(err.messsage);
            res.status(500).send('Server Error in team creation');
        }
    }
);

// @route       PUT api/teams/update/:id
// @description Update Team
// @access      Private
router.put('/update/:id', auth, async (req, res) => {
    const {
        teamstatus,
        featuredimg,
        teamtitle,
        teamlink,
        teamsubt,
        teamdetails,
        extraboxes,
        photo,
        name,
        lastname,
    } = req.body;

    const teamFields = {};
    if (teamstatus === true) {
        teamFields.teamstatus = true;
    } else {
        teamFields.teamstatus = false;
    }
    if (featuredimg) teamFields.featuredimg = featuredimg;
    if (teamtitle) teamFields.teamtitle = teamtitle;
    if (teamlink) teamFields.teamlink = teamlink;
    if (teamsubt) teamFields.teamsubt = teamsubt;
    if (teamdetails) teamFields.teamdetails = teamdetails;
    if (extraboxes) teamFields.extraboxes = extraboxes;
    if (photo) teamFields.photo = photo;
    if (name) teamFields.name = name;
    if (lastname) teamFields.lastname = lastname;

    try {
        let team = await Team.findById(req.params.id);

        if (!team) {
            return res.status(404).json({ msg: 'Team Item Not Found' });
        }

        team = await Team.findByIdAndUpdate(
            req.params.id,
            { $set: teamFields },
            { new: true }
        );

        res.json(team);
    } catch (err) {
        console.error(err.messsage);
        res.status(500).send('Server Error in news creation');
    }
});

// @route       GET api/teams
// @description Get all teams
// @access      Public
router.get('/', async (req, res) => {
    try {
        const teams = await Team.find().sort({ date: -1 });
        res.json(teams);
    } catch (err) {
        console.error(err.messsage);
        res.status(500).send('Server Error getting teams');
    }
});

// @route       GET api/teams/:teamlink
// @description Get team by Link
// @access      Public
router.get('/:teamlink', async (req, res) => {
    try {
        const team = await Team.findOne({
            teamlink: req.params.teamlink,
        }).populate('team');

        if (!team) {
            return res.status(404).json({ msg: 'Team Not Found' });
        }

        res.json(team);
    } catch (err) {
        console.error(err.messsage);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Team Not Found' });
        }
        res.status(500).send('Server Error getting teams');
    }
});

// @route       DELETE api/teams/:id
// @description Delete a team
// @access      Public
router.delete('/:id', auth, async (req, res) => {
    try {
        const team = await Team.findById(req.params.id);

        if (!team) {
            return res.status(404).json({ msg: ' Team not found' });
        }

        await team.remove();

        res.json({ msg: 'Team Removed' });
    } catch (err) {
        console.error(err.messsage);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: ' Team not found' });
        }
        res.status(500).send('Server Error deleting teams');
    }
});

module.exports = router;
