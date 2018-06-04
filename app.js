var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users.mjs');
var loginRouter = require('./routes/login.mjs');
var User = require("./models/user.mjs")
var mongoose = require("mongoose")
var app = express();
var passport = require("passport");
var BasicStrategy = require("passport-http").BasicStrategy;
var BearerStrategy = require("passport-http-bearer")

mongoose.connect('mongodb://localhost:27017')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

passport.use(new BasicStrategy(
  function(username, password, done) {

    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { 
        return done(null, false);
       }else{
        return done(null, user);
       }
    });
  }
));

passport.use(new BearerStrategy(

  function(token, done) {
    User.findOne({ token: token }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      return done(null, user, { scope: 'read' });
    });
  }
));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/login", loginRouter)

app.get('/users/me', passport.authenticate('bearer', { session: false }),
  function(req, res) {
    res.json(req.user);
  });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

