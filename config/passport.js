const LocalStrategy = require('passport-local').Strategy;

const User = require(__dirname + '/../app/models/user');


module.exports = function (passport) {

  // To Serialize and deSerialize User Sessions
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function (id, done) {
      User.findById(id, function(err, user) {
        done(err, user);
      });
    });

    // Local Register
    passport.use('local-register', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
      }, function(req, email, password, done) {
        // Call or findOne will not fire
        process.nextTick(function() {
          User.findOne({
              'local.email': email
            }).then(function(err, user) {
              // Check for error
              if (err)
                return done(err);
              // Check for already registered email
              if (user) {
                return done(null, false, req.flash('userMessage', 'That email is already taken.'))
              }
              // Create new user
              else {
                var newUser = new User();


                newUser.local.email = email;
                newUser.local.password = newUser.generateHash(password);

                newUser.save(function(){
                	if(err)
                		return done(err);

                	return done(null, newUser)

                });
              }
        });
      });
    }));
};