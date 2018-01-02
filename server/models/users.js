// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  name: String,
  lastname: String,
  age: Number,
  address: String,
  phone_number: Number,
  email: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: Boolean,
  banned: Boolean,
  created_at: Date,
  updated_at: Date
});

// the schema is useless so far
// we need to create a model using it
var Users = mongoose.model('Users', userSchema);

// make this available to our users in our Node applications
module.exports = Users;
