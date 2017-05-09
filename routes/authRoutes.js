/* jshint esversion:6 */

const express = require('express');
const passport = require('passport');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const router  = express.Router();

const multer  = require('multer');
const upload = multer({ dest: './public/uploads/' });

// LOGIN
router.get('/login', ensureLoggedOut(), (req, res) => {
    res.render('auth/login');
});
router.post('/login', ensureLoggedOut(), passport.authenticate('local-login', {
   successRedirect : '/',
   failureRedirect : '/signup'
}));

// SIGNUP USER
router.get('/signup', ensureLoggedOut(), (req, res) => {
  res.render('auth/signup');
});
router.post('/signup', ensureLoggedOut(), upload.single('profilePic'),  passport.authenticate('local-signup', {
   successRedirect : '/dog',
   failureRedirect : '/signup'
}));

// LOGOUT
router.get('/logout', ensureLoggedIn('/login'), (req, res) => {
    req.logout();
    res.redirect('/');
});


module.exports = router;
