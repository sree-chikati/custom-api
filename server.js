const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

// App Setup
const app = express();

// Auth checking
var checkAuth = (req, res, next) => {
    console.log("Checking authentication");
    if (typeof req.cookies.nToken == "undefined" || req.cookies.nToken === null) {
      console.log("No valid cookie found");
      req.user = null;
    } else {
      var token = req.cookies.nToken;
      var decodedToken = jwt.decode(token, { complete: true }) || {};
      req.user = decodedToken.payload;
    }
    next();
};

// All app.use
app.use('*/css',express.static('public/css')); // Allows us to use content from public file
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator()); // Add after body parser initialization!
app.use(cookieParser());
app.use(checkAuth);

// Middleware
const exphbs  = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Requires
require('./controllers/character.js')(app);
require('./controllers/auth.js')(app);
require('./data/api-db');

// Routes
app.get('/', (req, res) => {
    res.render('home');
})

app.listen(3000, () => {
    console.log('Custom API listening on port localhost:3000!');
});

module.exports = app;