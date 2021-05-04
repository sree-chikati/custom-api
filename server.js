const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
// App Setup
const app = express();

// All app.use
app.use('*/css',express.static('public/css')); // Allows us to use content from public file
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator()); // Add after body parser initialization!

// Middleware
const exphbs  = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Requires
require('./controllers/character.js')(app);
require('./data/api-db');

// Routes
app.get('/', (req, res) => {
    res.render('home');
})

app.listen(3000, () => {
    console.log('Custom API listening on port localhost:3000!');
});

module.exports = app;