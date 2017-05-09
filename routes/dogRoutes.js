/* jshint esversion:6 */

const express = require('express');
const passport = require('passport');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

const multer  = require('multer');
const upload = multer({ dest: './public/uploads/dogs' });

// Require Custom Middleware
const dogChecker = require('../middleware/dogChecker');

const User = require('../models/userModel');
const Dog = require('../models/dogModel');

const router  = express.Router();


router.get('/dog', ensureLoggedIn('/login'), dogChecker, (req, res, next) => {
    res.render('dog/dog');
});

router.post('/dog', ensureLoggedIn('login'), upload.single('picture'),  (req, res, next) => {
    const { name, breed, age, description } = req.body;

    const dog = new Dog({
        name,
        breed,
        age,
        picture : `/uploads/dogs/${req.file.filename}`,
        pictureName : `${req.file.originalname}`,
        description
    });

    dog.save((error, dogObj) => {
        if (error) { next(error); }

        const user = User.findById(req.user._id, (error, user) => {
            if (error) { return next(error); }
            user.dog = dogObj._id;
            user.save((error) => {
                if (error) { return next(error); }

                res.redirect('/');
            });
        });
    });
});

module.exports = router;
