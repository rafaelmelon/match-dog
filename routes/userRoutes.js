/* jshint esversion:6 */

const express = require('express');
const router  = express.Router();

router.get('/profile', (req, res, next) => {
  res.render('user/profile');
});

router.get('/profile-edit', (req, res, next) => {
  res.render('user/profile-edit');
});

router.get('/chat', (req, res, next) => {
  res.render('user/chat');
});

module.exports = router;
