const express = require('express');
const router = express.Router();
const User = require('../models/User.model');
const Card = require('../models/Card.model');


router.get('/profile', (req, res) => {
  res.render('users/my-area', { user: req.session.currentUser })
});

module.exports = router;