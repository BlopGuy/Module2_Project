const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const cardSchema = new Schema({ 
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  health: String,
  imageUrl: {
    type: String,
    required: [true, 'image is required']
  },
  imageUrlHiRes: String,
  releaseDate: Date,
  rarity: String
});


module.exports = model('Card', cardSchema);