const express = require('express');
const axios = require('axios');
const router = express.Router();
const Card = require('../models/Card.model');
const User = require('../models/User.model');
const PokeAPI = 'https://api.pokemontcg.io/v2/cards';

let getCard = () => {
  let randomPage = Number(Math.floor(Math.random()*(10 - 1)) + 1);
  

  axios.get(`${PokeAPI}?page=${randomPage}`)
  .then((response) =>{
    const data = response.data.data;
    let randomIndex = Number(Math.floor(Math.random()*(data.length - 1)) + 1);
    let chosenCard = data[randomIndex];
    let cardObject = {
      name: chosenCard.name,
      imageUrl: chosenCard.images.small,
      imageUrlHiRes: chosenCard.images.large,
      releaseDate: chosenCard.set.releaseDate,
      artist: chosenCard.artist,
      rarity: chosenCard.rarity
    };
    console.log(cardObject);
    return cardObject;
  });
};


router.get('/cards', (req, res) => {
  res.render('cards/card-collection');
});

router.get('/booster', (req, res) => {
  res.render('cards/booster-pack');
});

router.post('/booster', (req, res) => {
  let chosenCard = getCard();
  res.render('cards/booster-pack');
});


module.exports = router;