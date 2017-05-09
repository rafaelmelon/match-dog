/* jshint esversion:6 */

const express = require('express');
const router  = express.Router();

router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/home', (req, res, next) => {
  res.render('home/match');
});

module.exports = router;
