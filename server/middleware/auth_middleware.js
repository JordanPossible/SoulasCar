var passport = require("passport");

module.exports = {

  isLoggedIn: function(req, res, next) {
      if (req.isAuthenticated())
          return next();

      res.send({error: true, message: 'not_logged'});
  }
}
