const mongoose = require('mongoose');
const {
  Schema,
  model
} = mongoose;

const boosterSchema = new Schema({
  cards: [{
    type: Schema.Types.ObjectId,
    ref: 'Card'
  }]
});


module.exports = model('Booster', boosterSchema);