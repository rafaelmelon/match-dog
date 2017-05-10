/* jshint esversion:6 */

const express = require('express');
const passport = require('passport');
const {ensureLoggedIn, ensureLoggedOut} = require('connect-ensure-login');
const router = express.Router();

const User = require('../models/userModel');
const Dog = require('../models/dogModel');

router.get('/profile', ensureLoggedIn('/login'), (req, res, next) => {
    const user = User.findOne({_id: req.user._id}).populate("dog").exec((error, user)=>{
       if (error) { next(error); }
        res.render('user/profile', {user: user});
    });
});

router.get('/profile-edit', (req, res, next) => {
    const user = User.findOne({_id: req.user._id}).populate("dog").exec((error, user)=>{
        if (error) { next(error); }
        res.render('user/profile-edit', {user: user});
    });
});

router.get('/chat', (req, res, next) => {
    res.render('user/chat', {user: req.user});
});

module.exports = router;
