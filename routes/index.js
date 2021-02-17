const express = require('express');
const router = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index', { user: req.session.currentUser });
});

router.get('/gameInfo', (req, res) => {
  res.render('game-info');
});

module.exports = router;