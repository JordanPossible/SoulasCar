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


router.use(require('./auth'));
router.use(require('./trajet'));
router.use(require('./trajetType'));
router.use(require('./user'));
router.use(require('./vehicule'));

module.exports = router;
