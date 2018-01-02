const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

var TrajetTypes = require('../models/trajetTypes');

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

module.exports = router;
