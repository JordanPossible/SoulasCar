// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var trajetTypeSchema = new Schema({
  city_start: String,
  city_end: String,
  distance: Number,
  time: Number,
  validated: Boolean,

  created_at: Date,
  updated_at: Date
});

// the schema is useless so far
// we need to create a model using it
var trajetTypes = mongoose.model('trajetTypes', trajetTypeSchema);

// make this available to our trajets in our Node applications
module.exports = trajetTypes;
