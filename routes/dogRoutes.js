const express = require('express');
const passport = require('passport');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const router  = express.Router();


router.get('/dog', ensureLoggedIn('/login'),(req, res, next) => {
    res.render('dog/dog');
});

module.exports = router;
