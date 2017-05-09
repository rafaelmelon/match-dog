/* jshint esversion:6 */

const express = require('express');
const passport = require('passport');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const router = express.Router();

router.get('/', ensureLoggedIn('/login'), (req, res, next) => {
    res.render('index');
});

router.get('/home', (req, res, next) => {
    res.render('home/match');
});

module.exports = router;
