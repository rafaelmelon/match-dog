const User = require('../models/userModel');

function dogChecker(req, res, next){
    User.findById(req.user._id, (error, user) => {
        if (error) { return next(error); }

        if (user.dog == null) {
            return next();
        } else {
            return res.redirect('/');
        }
    });
}

module.exports = dogChecker;