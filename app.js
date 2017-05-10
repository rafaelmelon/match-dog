/* jshint esversion:6 */

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Require Routes
const authRoutes = require('./routes/authRoutes');
const homeRoutes = require('./routes/homeRoutes');
const userRoutes = require('./routes/userRoutes');
const dogRoutes = require('./routes/dogRoutes');

mongoose.connect('mongodb://localhost/project-match-dog');

const app = express();

// default value for title local
//app.locals.title = 'Express - Generated with IronGenerator';

// passport authentication configs
require('./config/passportConfig')(app);
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

//

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// view engine setup
app.use(expressLayouts);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layouts/main-layout');

app.use('/node_modules', express.static(__dirname + '/node_modules/'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// require in the routers
app.use('/', authRoutes);
app.use('/', homeRoutes);
app.use('/', userRoutes);
app.use('/', dogRoutes);


// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
