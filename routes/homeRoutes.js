/* jshint esversion:6 */

const express = require('express');
const passport = require('passport');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const router = express.Router();

const User = require('../models/userModel');

router.get('/', ensureLoggedIn('/login'), (req, res, next) => {
    User.find({}).populate('dog').exec((error, users) => {
        if (error) { return next(error); }
        console.log(users);
        res.render('index', { users: users });
    });
});

module.exports = router;
