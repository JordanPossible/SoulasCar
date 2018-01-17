const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

var Users = require('../models/users');
var Vehicles = require('../models/vehicles');

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

module.exports = router;
