/* jshint esversion:6 */

const express = require('express');
const router  = express.Router();

router.get('/login', (req, res) => {
  res.render('auth/login');
});

router.get('/signup1', (req, res) => {
  res.render('auth/signup1');
});

router.get('/signup2', (req, res) => {
  res.render('auth/signup2');
});

module.exports = router;
