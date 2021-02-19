const express = require('express');
const axios = require('axios');
const router = express.Router();
const Card = require('../models/Card.model');
const User = require('../models/User.model');
const Booster = require('../models/Booster.model');
const PokeAPI = 'https://api.pokemontcg.io/v2/cards';

let getCard = () => {
  let randomPage = Number(Math.floor(Math.random() * (10 - 1)) + 1);
  return axios.get(`${PokeAPI}?page=${randomPage}`)
    .then((response) => {
      const data = response.data.data;
      let randomIndex = Number(Math.floor(Math.random() * (data.length - 1)) + 1);
      let chosenCard = data[randomIndex];
      let cardObject = {
        name: chosenCard.name,
        imageUrl: chosenCard.images.small,
        imageUrlHiRes: chosenCard.images.large,
        releaseDate: chosenCard.set.releaseDate,
        artist: chosenCard.artist,
        rarity: chosenCard.rarity
      };
      return cardObject;
    });
};


router.get('/cards', (req, res) => {
  res.render('cards/card-collection');
});

router.get('/booster', (req, res) => {
  let boosterPackPromises = [];
  for (let i = 0; i < 5; i++) {
    boosterPackPromises.push(getCard());
  }
  let cardCreation = [];
  Promise.all(boosterPackPromises).then((response) => {
    response.forEach(card => {
      cardCreation.push(Card.create({ name: card.name, imageUrl: card.imageUrl, imageUrlHiRes: card.imageUrlHiRes, releaseDate: card.releaseDate, artist: card.artist, rarity: card.rarity }));
    });

    Promise.all(cardCreation).then((createdCards) => {
      let boosterPackCardsIds = createdCards.map((card) => card._id);

      Booster.create({ cards: boosterPackCardsIds })
        .then((response) => {
          let boosterId = response._id;
          res.redirect(`/booster/${boosterId}`);
        });
    });
  });
});

router.get('/booster/:boosterId', (req, res) => {
  let boosterId = req.params.boosterId;
  let cardsFromBooster = [];
  Booster.findById(boosterId)
    .then((boosterFromDB) => {
      let idsFromBooster = boosterFromDB.cards;
      
      idsFromBooster.forEach((cardId) => {
        cardsFromBooster.push(Card.findById(cardId));
      });

      Promise.all(cardsFromBooster)
        .then(() => {
          res.render('cards/booster-pack', { cards: cardsFromBooster });
        });
    });
});

router.post('/booster/:boosterId/add', (req, res) => {
  res.redirect(`/booster/${boosterId}`);
});


module.exports = router;