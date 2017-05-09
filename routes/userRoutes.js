/* jshint esversion:6 */

const express = require('express');
const passport = require('passport');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const router  = express.Router();

router.get('/profile', ensureLoggedIn('/login'), (req, res, next) => {
  res.render('user/profile',{user : req.user});
});

router.get('/profile-edit', (req, res, next) => {
  res.render('user/profile-edit',{user : req.user});
});

router.get('/chat', (req, res, next) => {
  res.render('user/chat',{user : req.user});
});

module.exports = router;
