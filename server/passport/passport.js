
var LocalStrategy = require('passport-local').Strategy;
// var JwtStrategy = require('passport-jwt').Strategy;

var Users = require('../models/users');



module.exports = function(passport,user){
passport.serializeUser(function(user, done) {
			done(null, user._id);
	});


// used to deserialize the user
passport.deserializeUser(function(id, done) {
	Users.findById(id).then(function(user) {
		if(user){
			done(null, user);
		}
		else{
			done(user.errors,null);
		}
	});

});


passport.use('local-signup', new LocalStrategy(

{
	usernameField : 'username',
	passwordField : 'password',
	passReqToCallback : true // allows us to pass back the entire request to the callback
},

function(req, username, password, done){




	Users.findOne({"username":username}).limit(1).then(function(user){
	if(user)
	{
		return done(null, false, {error: true, message : 'existing_username'} );
	}

	else
	{
		var data = Users({
			name: req.body.name,
			lastname: req.body.lastname,
			age: req.body.age,
			address: req.body.address,
			username: req.body.username,
			password: req.body.password,
			phone_number: req.body.phone_number,
			email: req.body.email,
			banned:false,
			admin: false
		});


		Users.create(data).then(function(newUsers,created){
			if(!newUsers){
				return done(null,false);
			}

			if(newUsers){
				return done(null,newUsers);
			}


		});
	}


});



}



));

//LOCAL SIGNIN
passport.use('local-signin', new LocalStrategy(

{

// by default, local strategy uses username and password, we will override with username
usernameField : 'username',
passwordField : 'password',
passReqToCallback : true // allows us to pass back the entire request to the callback
},

function(req, username, password, done) {

var isValidPassword = function(userpass,password){
	return password == userpass;
}

Users.find({"username": req.body.username}).limit(1).then(function (result) {
	user = result[0]
	if (!user) {
		return done(null, false, {error: true, message: 'invalid_username' });
	}

	if (!isValidPassword(user.password,req.body.password)) {

		return done(null, false, {error: true, message: 'invalid_password' });

	}


	return done(null,user);

}).catch(function(err){

	console.log("Error:",err);
	return done(null, false, {error: true, message: 'db_err' });


});

}
));

}
