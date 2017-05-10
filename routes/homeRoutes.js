/* jshint esversion:6 */

const express = require('express');
const passport = require('passport');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const router = express.Router();

const User = require('../models/userModel');
const Match = require('../models/matchModel');

router.get('/', ensureLoggedIn('/login'), (req, res, next) => {
    User.find({ _id: {$ne: req.user._id} }).populate('dog').exec((error, users) => {
        if (error) { return next(error); }
        console.log(users);
        res.render('index', { users: users });
    });
});

router.post('/lastviewed', ensureLoggedIn('/login'), (req, res, next) => {
    User.findById(req.user._id).exec((error, user) => {
        if (error) { return next(error); }

        user.lastViewed = req.body.date;

        user.save((error) => {
           if (error) { return next(error); }

           res.status(200).json({ message: 'OK' });
        });
    });
});

router.post('/match', ensureLoggedIn('/login'), (req, res, next) => {
    const match = new Match({
        users: [req.user._id, req.body.id]
    });

    match.save((error) => {
        if (error) { return next(error); }

        res.status(200).json({ message: 'OK' });
    });
});

module.exports = router;
