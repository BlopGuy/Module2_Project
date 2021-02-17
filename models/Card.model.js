const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const cardSchema = new Schema({ 
  name: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  imageUrlHiRes: String,
  releaseDate: Date,
  rarity: String,
  artist: String
});


module.exports = model('Card', cardSchema);