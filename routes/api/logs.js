const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Log = require('../../models/Log');
const User = require('../../models/User');

// @route       POST api/logs
// @description Create a log
// @access      Private
router.post('/', [auth], async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    const newLog = new Log({
      msg: req.body.msg,
      type: req.body.type,
      name: user.name,
      user: req.user.id,
    });

    const log = await newLog.save();

    res.json(log);
  } catch (err) {
    console.error(err.messsage);
    res.status(500).send('Server Error in log creation');
  }
});

// @route       GET api/logs
// @description Get all logs
// @access      Public
router.get('/', async (req, res) => {
  try {
    const logs = await Log.find().sort({ date: -1 });
    res.json(logs);
  } catch (err) {
    console.error(err.messsage);
    res.status(500).send('Server Error getting logs');
  }
});

module.exports = router;
