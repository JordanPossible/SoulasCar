const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

var Users = require('../models/users');
var auth = require('../middleware/auth_middleware.js');
var passport = require("passport");

// Connect
const connection = (closure) => {
  return mongoose.connect('mongodb://localhost:27017/soulas_car', (err, db) => {
    if (err) return console.log(err);

    closure(db);
  });
};

// Error handling
const sendError = (err, res) => {
  response.status = 501;
  response.message = typeof err == 'object' ? err.message : err;
  res.status(501).json(response);
};

// Response handling
let response = {
  status: 200,
  data: [],
  message: null
};


router.route('/sign_up')
.post(function(req, res, next){
  passport.authenticate('local-signup', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json(info);
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.send(req.user);
    });

  })(req, res, next)
});

router.route('/sign_in')
.post(function(req, res, next){
  passport.authenticate('local-signin', function(err, user, info) {
    console.log(user)
    if (err) {
      console.log(err)

      return next(err);
    }
    if (!user) {
      console.log(info)

      return res.json(info);
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      console.log(req)

      return res.send(req.user);
    });

  })(req, res, next)

});

router.route('/logout')
.get(function(req, res) {
  req.session.destroy(function() {
    res.send('disconnected');
  });
});

router.route('/me')
.get( auth.isLoggedIn, function(req, res) {
  Users.find({
    "_id": req.user._id
  }).then(function (user) {
    res.send(user)
  }).catch(function (err) {
    res.send(err);
  });
});

module.exports = router;
