// Require dependencies and create app
const express = require('express');
const app = express();
var mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

// Connect to DB
const db = require('./config/db');
mongoose.connect(db.url);
// Set PORT
const PORT = process.env.PORT || 3000;

// Configure middleware

require('./config/passport')(passport);
// Parse JSON
app.use(bodyParser.json());
// Parse as JSON
app.use(bodyParser.json({type: 'application/vnd.api+json' }));
// Parse URL Encoded 
app.use(bodyParser.urlencoded({ extended: true })); 
// Override with XHTTP HEADER
app.use(methodOverride('X-HTTP-Method-Override')); 
// Auth middleware
app.use(session({secret: 'porno'}));
app.use(passport.initialize());
app.use(passport.session());
// Set directory of public files
app.use(express.static(__dirname + '/public')); 


// Routes
require('./app/routes')(app, passport); // configure our routes

// SERVER START ===============================================

// Set server to listen on PORT
app.listen(PORT);               
// Tell user            
console.log('Magic happens on port ' + PORT);

// Expose app           
exports = module.exports = app;                         
