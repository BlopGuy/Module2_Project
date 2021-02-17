const express = require('express');
const router = express.Router();
const Card = require('../models/Card.model');
const User = require('../models/User.model');
const PokeAPI = 'https://api.pokemontcg.io/v2/cards/';


router.get('/cards', (req, res) => {
  res.render('cards/card-collection');
});










module.exports = router;