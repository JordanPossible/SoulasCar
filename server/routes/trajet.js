const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

var Users = require('../models/users');
var Trajets = require('../models/trajets');
var TrajetTypes = require('../models/trajetTypes');
var Vehicles = require('../models/vehicles');

var auth = require('../middleware/auth_middleware.js');


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

module.exports = router;
