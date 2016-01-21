// Require in mongoose
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');


// User Model
var userSchema = mongoose.Schema({
	// Full name of user
	name: {type: String, default: ''},
	// Gender of user
	gender: {type: String, default: ''},
	// Age of user
	age: {type: String, default: ''},
	// Address to deliver to
	address: {type: String, default: ''},
	// Weight of user
	weight: {type: String, default: ''},
	// Level of Activity
	fitness: {type: String, default: ''},
	// List of health goals
	goals: {type: Array, default: []},
	// Body type of user
	bodyType: {type: String, default: ''},
	// Estimated number of calories consumed daily
	calories: {type: String, default: ''},
	// Vegan, Soy Free, Dairy Free, Gluton free, Paleo, Crohns
	restrictions: {type: Array, default: []},
	// List of allergies
	allergies: {type: Array, default: []},
	// List of dislikes
	dislikes: {type: Array, default: []},
	// Login info
	local: {
		email: {type: String, default: "samheutmaker@gmail.com"},
		password: {type: String, default: ""}
	}
});

// METHODS ==========

// Generate hashed password
userSchema.methods.generateHash = (passwordToHash) => {
	return bcrypt.hashSync(passwordToHash, bcrypt.genSaltSync(8), null);
};
// Check is password is valid
userSchema.methods.validPassword = (passwordToTest) => {
	return bcrypt.compareSync(passwordToTest, this.local.password);
};


module.exports = mongoose.model('User', userSchema);



