/* jshint esversion:6 */

const express = require('express');
const passport = require('passport');
const {ensureLoggedIn, ensureLoggedOut} = require('connect-ensure-login');
const router = express.Router();

const multer  = require('multer');
const upload = multer({ dest: './public/uploads/images/' });

const User = require('../models/userModel');
const Dog = require('../models/dogModel');
const Match = require('../models/matchModel');
const Message = require('../models/messageModel');

router.get('/profile', ensureLoggedIn('/login'), (req, res, next) => {
    User.findById(req.user._id).populate('dog').exec((error, user)=>{
       if (error) { next(error); }
        res.render('user/profile', {user: user});
    });
});

router.get('/profile-edit', (req, res, next) => {
    User.findById(req.user._id).populate('dog').exec((error, user)=>{
        if (error) { next(error); }
        res.render('user/profile-edit', {user: user});
    });
});

router.post('/profile-edit', upload.array('picture', 2), ensureLoggedIn('/login'), (req, res, next) => {
   User.findById(req.user._id).exec((error, user) => {
       if (error) { return next(error); }

       user.fullname = req.body.fullname;
       user.age = req.body.age;
       user.description = req.body.description;

       if (typeof req.files[0] !== 'undefined') {
           user.profilePic = `/uploads/images/${req.files[0].filename}`;
           user.profilePicName = `${req.files[0].originalname}`;
       }

       user.save((error) => {
           if (error) { return next(error); }

           Dog.findById(user.dog).exec((error, dog) => {
               if (error) { return next(error); }

               dog.name = req.body.name;
               dog.breed = req.body.breed;
               dog.age = req.body.dogAge;
               dog.description = req.body.dogDescription;

               if (typeof req.files[1] !== 'undefined') {
                   dog.picture = `/uploads/images/${req.files[1].filename}`;
                   dog.pictureName = `${req.files[1].originalname}`;
               }

               dog.save((error) => {
                   if (error) { return next(error); }
                   res.redirect('/profile');
               });
           });
       });
   });
});

router.get('/chat', (req, res, next) => {
    Match.find({ $or: [{ user1: req.user._id }, { user2: req.user._id }], matched: true }).exec((error, matches) => {
        if (error) { return next(error); }

        console.log(matches);
    });
    res.render('user/chat', {user: req.user});
});

module.exports = router;
