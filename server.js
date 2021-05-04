const express = require('express');
// App Setup
const app = express();

// Allows us to use content from public file
app.use('*/css',express.static('public/css'));

// Middleware
const exphbs  = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Routes
app.get('/', (req, res) => {
    res.render('home');
})

app.listen(3000, () => {
    console.log('Gif Search listening on port localhost:3000!');
});