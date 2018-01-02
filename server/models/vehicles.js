// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var vehicleSchema = new Schema({
  type: String,
  doors: Number,
  places: Number,
  created_at: Date,
  updated_at: Date
});

// the schema is useless so far
// we need to create a model using it
var Vehicles = mongoose.model('Vehicles', vehicleSchema);

// make this available to our users in our Node applications
module.exports = Vehicles;
