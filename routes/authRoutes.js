/* jshint esversion:6 */

const express = require('express');
const passport = require('passport');
const router  = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

// LOGIN
router.get('/login', ensureLoggedOut(), (req, res) => {
  res.render('auth/login');
});
router.post('/login', ensureLoggedOut(), passport.authenticate('local-login', {
  successRedirect : '/',
  failureRedirect : '/signup-user'
}));

// SIGNUP USER
router.get('/signup-user', (req, res) => {
  res.render('auth/signup-user');
});
router.post('/signup-user', ensureLoggedOut(), passport.authenticate('local-signup', {
  successRedirect : '/signup-dog',
  failureRedirect : '/signup-user'
}));

// SIGNUP DOG
router.get('/signup-dog', (req, res) => {
  res.render('auth/signup-dog');
});
router.post('/signup-dog', ensureLoggedOut(), passport.authenticate('local-signup', {
   successRedirect : '/',
   failureRedirect : '/signup-dog'
}));

// LOGOUT
router.get('/logout', ensureLoggedIn('/login'), (req, res) => {
    req.logout();
    res.redirect('/');
});


module.exports = router;
