const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

var Users = require('../models/users');
var Trajets = require('../models/trajets');
var TrajetTypes = require('../models/trajetTypes');
var Vehicles = require('../models/vehicles');

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

// Get users
router.get('/users', (req, res) => {
  connection((db) => {
    Users.find({}, function(err, users) {
      if (err) res.send(err);
      response.data = users;
      res.json(response);
      // object of all the users
      console.log(users);
    });
  });
});


// Get trajets
router.get('/trajets', (req, res) => {
  connection((db) => {
    Trajets.find({}, function(err, trajets) {
      if (err) res.send(err);
      response.data = trajets;
      res.json(response);
      console.log(trajets);

    });
  });

});

router.post('/trajets', (req, res) => {
    connection((db) => {

      // create a new trajet
      var newTrajet = Trajets({
        address_start: req.body.address_start,
        address_end: req.body.address_end,
        date_start: req.body.date_start,
        date_end: req.body.date_end,
        price_by_km: req.body.price_by_km,
        nbr_place: req.body.nbr_place
      });

      // save the trajet
      newTrajet.save(function(err) {
        if (err) res.send(err);

        console.log('Trajet created!');
      });

    });
});


// Get trajetTypes
router.route('/trajetTypes')
.get(auth.isLoggedIn, (req, res) => {
  connection((db) => {
    TrajetTypes.find({}, function(err, trajetTypes) {
      if (err) res.send(err);
      response.data = trajetTypes;
      res.json(response);
      console.log(trajetTypes);

    });
  });

})

.post(auth.isLoggedIn, (req, res) => {
    connection((db) => {

      // create a new trajetTypes
      var newTrajetType = TrajetTypes({
        city_start: req.body.city_start,
        city_end: req.body.city_end,
        distance: req.body.distance,
        time: req.body.time,
        validated: true
      });

      // save the trajetType
      newTrajetType.save(function(err) {
        if (err) res.send(err);

        console.log('TrajetTypes created!');
      });

    });
});

// Get vehicles
router.route('/vehicles')
.get( (req, res) => {
  connection((db) => {
    Vehicles.find({}, function(err, vehicles) {
      if (err) res.send(err);
      response.data = vehicles;
      res.json(response);
      console.log(vehicles);

    });
  });

})

.post( (req, res) => {
    connection((db) => {

      // create a new vehicles
      var newVehicles = Vehicles({
        type: req.body.type,
        doors: req.body.doors,
        places: req.body.places
      });

      // save the trajetType
      newVehicles.save(function(err) {
        if (err) res.send(err);

        console.log('Vehicles created!');
      });

    });
});


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
