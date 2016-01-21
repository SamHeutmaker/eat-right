const User = require(__dirname + '/models/user');

module.exports = function(app, passport) {

	app.post('/register', passport.authenticate('local-register'), (req, res) =>{
			res.send(req.user);
	});	


	app.post('/login', (req, res) => {

	});


	app.get('*', (req, res) => {
		res.redirect('/');
	})

};


function isLoggedIn(req, res, next) {

	if(req.isAuthenticated()) {
		return next();
	}

	res.redirect('/');
}