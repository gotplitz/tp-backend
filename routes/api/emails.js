const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Email = require('../../models/Emails');

// email setup
const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

const mailgunAuth = {
	auth: {
		api_key: '',
		domain: 'mg.ferociousmediaweb.com',
	},
};

const smtpTransport = nodemailer.createTransport(mg(mailgunAuth));

// @route       GET api/emails
// @description Get all emails
// @access      Public
router.get('/', async (req, res) => {
	try {
		const emails = await Email.find().sort({ date: -1 });
		res.json(emails);
	} catch (err) {
		console.error(err.messsage);
		res.status(500).send('Server Error getting emails');
	}
});

// @route       POST api/emails
// @description Post new email
// @access      Public
router.post(
	'/',
	[
		[
			check('fullname', 'Name is Required').not().isEmpty(),
			check('phone', 'Phone number is Required').not().isEmpty(),
			check('clientemail', 'Emails is Required').not().isEmpty(),
			check('message', 'Message is Required').not().isEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const emailTemplateSource = fs.readFileSync(
				path.join(__dirname, '../../htmltemplates/email-template.hbs'),
				'utf8'
			);
			const emailTemplateRes = fs.readFileSync(
				path.join(__dirname, '../../htmltemplates/response-template.hbs'),
				'utf8'
			);
			const template = handlebars.compile(emailTemplateSource);
			const templatetwo = handlebars.compile(emailTemplateRes);

			const newEmail = new Email({
				fullname: req.body.fullname,
				phone: req.body.phone,
				clientemail: req.body.clientemail,
				how: req.body.how,
				message: req.body.message,
			});

			const htmlToSend = template({
				fullname: `${req.body.fullname}`,
				phone: `${req.body.phone}`,
				clientemail: `${req.body.clientemail}`,
				how: `${req.body.how}`,
				message: `${req.body.message}`,
			});

			const resToSend = templatetwo({
				fullname: `${req.body.fullname}`,
			});

			const mailOptions = {
				from: `"T.P.'s Detailing" <postmaster@mg.ferociousmediaweb.com>`,
				to: `tpertoso@gmail.com`,
				bcc: `websites@ferociousmedia.com`,
				replyTo: `${req.body.clientemail}`,
				subject: 'New inquiry from website',
				html: htmlToSend,
			};

			const mailOptionsTwo = {
				from: `"T.P.'s Detailing" <postmaster@mg.ferociousmediaweb.com>`,
				to: `${req.body.clientemail}`,
				subject: 'Thanks for contacting us',
				html: resToSend,
			};

			smtpTransport.sendMail(mailOptions, (err, data) => {
				if (err) {
					res.json({
						msg: 'fail',
					});
				} else {
					newEmail.save();
					res.json({
						msg: 'success',
					});
				}
			});
			smtpTransport.sendMail(mailOptionsTwo);
		} catch (err) {
			console.error(err.messsage);
			res.status(500).send('Server Error Sending Email');
		}
	}
);

// @route       DELETE api/emails/:id
// @description Delete an email
// @access      Private
router.delete('/:id', auth, async (req, res) => {
	try {
		const email = await Email.findById(req.params.id);

		if (!email) {
			return res.status(404).json({ msg: ' Email not found' });
		}

		await email.remove();

		res.json({ msg: 'Email Removed' });
	} catch (err) {
		console.error(err.messsage);
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ msg: ' Email not found' });
		}
		res.status(500).send('Server Error deleting emails');
	}
});

module.exports = router;
