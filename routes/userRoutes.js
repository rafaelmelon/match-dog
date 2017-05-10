/* jshint esversion:6 */

const express = require('express');
const passport = require('passport');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const router  = express.Router();

const multer  = require('multer');
const uploadImgUser = multer({ dest: './public/uploads/' });
const uploadImgDog = multer({ dest: './public/uploads/dogs' });

const User = require('../models/userModel');
const Dog = require('../models/dogModel');

router.get('/profile', ensureLoggedIn('/login'), (req, res, next) => {
  res.render('user/profile',{user : req.user});
});

router.get('/profile-edit', (req, res, next) => {
  res.render('user/profile-edit',{user : req.user});
});

router.post('/edit-user', uploadImgUser.single('profilePic'), ensureLoggedIn('/login'), (req, res, next) => {
  const updateUser = {
    fullname: req.body.fullname,
    age: req.body.age,
    description: req.body.description,
    profilePic : `/uploads/${req.file.filename}`,
    profilePicName : `${req.file.originalname}`,
  };

  User.findByIdAndUpdate(req.user.id, updateUser, (err, profile) => {
    if (err) { return res.render('/profile-edit', { profile, errors: profile.errors }); }
    return res.redirect(`/profile`);
  });
});

router.post('/edit-dog', uploadImgDog.single('picture'), ensureLoggedIn('/login'), (req, res, next) => {
  const updateDog = {
    name: req.body.fullname,
    breed: req.body.breed,
    age:  req.body.age,
    description: req.body.description,
    picture : `/uploads/${req.file.filename}`,
    pictureName : `${req.file.originalname}`,
  };

  Dog.findByIdAndUpdate(req.user.id, updateDog, (err, profile) => {
    if (err) { return res.render('/profile-edit', { profile, errors: profile.errors }); }
    return res.redirect(`/profile`);
  });
});

router.get('/chat', (req, res, next) => {
  res.render('user/chat',{user : req.user});
});

module.exports = router;
