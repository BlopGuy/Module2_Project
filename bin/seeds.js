const mongoose = require('mongoose');
const User = require('../models/User.model');
const DB_NAME = 'module2-project';
mongoose.connect(`mongodb://localhost/${DB_NAME}`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const users = [
  {
    username: 'BlopGuy',
    email: 'guigue@live.com.pt',
    password: 'Blop12',
    role: 'admin'
  }
];

User.create(users)
  .then(usersFromDB => {
    console.log(`Created ${usersFromDB.length} users`);
    // Once created, close the DB connection
    mongoose.connection.close();
  });