/* jshint esversion:6 */

const express = require('express');
const passport = require('passport');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const router = express.Router();

const User = require('../models/userModel');
const Match = require('../models/matchModel');

router.get('/', ensureLoggedIn('/login'), (req, res, next) => {
    Match.find({user2: req.user._id, matched: false}).populate({ path:'user1', populate: { path: 'dog' }}).sort({createdAt: -1}).exec((error, matches) => {
        if (error) { return next(error); }

        if (matches.length > 0) {
            User.findById(req.user._id).populate('dog').exec((error, user) => {
                if (error) { return next(error); }

                res.render('index', {
                    matches: matches,
                    users: [],
                    user: user
                });
            });
        } else {
            User.find({ createdAt: { $gt: new Date(req.user.lastViewed) }, _id: {$ne: req.user._id} }).sort({createdAt: -1}).populate('dog').exec((error, users) => {
                if (error) { return next(error); }

                User.findById(req.user._id).populate('dog').exec((error, user) => {
                    if (error) { return next(error); }

                    res.render('index', {
                        matches: [],
                        users: users,
                        user: user
                    });
                });
            });
        }
    });
});

router.post('/lastviewed', ensureLoggedIn('/login'), (req, res, next) => {
    if (req.body.type == 'match')
        Match.remove({ user1: req.body.id, user2: req.user._id, matched: false }).exec((error) => {
            if (error) { return next(error); }

            User.findById(req.user._id).exec((error, user) => {
                if (error) { return next(error); }

                user.lastViewed = new Date(req.body.date);

                user.save((error) => {
                    if (error) { return next(error); }

                    res.status(200).json({ message: 'OK' });
                });
            });
        });
    else
        User.findById(req.user._id).exec((error, user) => {
            if (error) { return next(error); }

            user.lastViewed = new Date(req.body.date);

            user.save((error) => {
               if (error) { return next(error); }

               res.status(200).json({ message: 'OK' });
            });
        });
});

router.post('/match', ensureLoggedIn('/login'), (req, res, next) => {
    if (req.body.type == "user") {
        const match = new Match({
            user1: req.user._id,
            user2: req.body.id
        });

        match.save((error) => {
            if (error) { return next(error); }

            User.findById(req.user._id).exec((error, user) => {
                if (error) { return next(error); }

                user.lastViewed = new Date(req.body.date);

                user.save((error) => {
                    if (error) { return next(error); }

                    res.status(200).json({ message: 'OK' });
                });
            });
        });
    } else {
        Match.findOne({ user1: req.body.id, user2: req.user._id }).exec((error, match) => {
            if (error) { return next(error); }

            match.matched = true;

            User.findById(req.user._id).exec((error, user) => {
                if (error) { return next(error); }

                user.lastViewed = new Date(req.body.date);

                user.save((error) => {
                    if (error) { return next(error); }

                    match.save((error) => {
                        if (error) { return next(error); }

                        res.status(200).json({ message: 'MATCHED' });
                    });
                });
            });
        });
    }
});

module.exports = router;
