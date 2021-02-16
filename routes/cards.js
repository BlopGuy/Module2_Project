const express = require('express');
const router = express.Router();
const Card = require('../models/Card.model');
const User = require('../models/User.model');

router.get('/', (req, res) => {
  res.render('index');
});










module.exports = router;