const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

var Users = require('../models/users');

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

module.exports = router;
