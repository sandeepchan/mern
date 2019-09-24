const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const crypto = require('crypto');

const nodemailer = require('nodemailer');

const { check, validationResult } = require('express-validator');
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});
//login
router.post(
  '/',
  [
    check('email', 'please include valid email').isEmail(),
    check('password', 'password is required').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'invalid credentials' }] });
      }
      const isMatched = await bcrypt.compare(password, user.password);
      if (!isMatched) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'invalid credentials' }] });
      }

      const payload = {
        user: {
          id: user.id
        }
      };
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 400000
        },
        (err, token) => {
          if (err) {
            throw err;
          }
          res.json({ token });
        }
      );
    } catch (error) {
      console.log(error.message);
      res.status(500).json('server Error');
    }
  }
);
//forgot
router.post(
  '/forgot',
  [check('email', 'please include valid email').isEmail()],
  async (req, res) => {
    const { email } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ errors: [{ msg: 'invalid email' }] });
      }
      const token = crypto.randomBytes(20).toString('hex');
      console.log(token);
      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 3600000; //1 hour
      await user.save();
      const smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'nonreplysandeep@gmail.com',
          pass: 'sandeep123@'
        }
      });
      //user see
      const mailOptions = {
        to: user.email,
        from: 'nonreply@gmail.com',
        subject: ' Password Reset',
        text:
          'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://localhost:3000/reset/' +
          token +
          '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        if (err) {
          res.status(500).json('something went wrong');
        } else {
          res.status(200).json('recovery email send');
        }
      });
    } catch (err) {
      console.log(error.message);
      res.status(500).json('server Error');
    }
  }
);

router.put('/reset/:token', async (req, res) => {
  try {
    const user = User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.json('Password reset token is invalid or has expired');
    }

    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(req.body.password, salt);

    await user.updateOne({
      password: hashpassword,
      resetPasswordToken: undefined,
      resetPasswordExpires: undefined
    });

    // await user.save();

    res.status(200).json('password link ok');
  } catch (err) {
    console.log(err.message);
    res.status(500).json('server Error');
  }
});
module.exports = router;
