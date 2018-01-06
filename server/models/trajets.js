// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var trajetSchema = new Schema({
  address_start: String,
  address_end: String,
  date_start: Date,
  date_end: Date,
  price_by_km: Number,
  nbr_place: Number,

  trajet_id: Schema.Types.ObjectId,

  created_at: Date,
  updated_at: Date
});

// the schema is useless so far
// we need to create a model using it
var trajets = mongoose.model('trajets', trajetSchema);

// make this available to our trajets in our Node applications
module.exports = trajets;
