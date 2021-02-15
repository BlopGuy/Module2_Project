const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const cardSchema = new Schema({ 
  name: {
    type: String,
    required: true
  },
  Health: String,
  imageUrl: {
    type: String,
    required: true
  },
  imageUrlHiRes: String,
  releaseDate: Date,
  rarity: String
});


module.exports = model('Card', cardSchema);