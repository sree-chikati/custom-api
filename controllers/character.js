const Character = require('../models/character');
const User = require('../models/user');

module.exports = app => {
    // HOME
    app.get('/', (req, res) => {
      var currentUser = req.user;
      console.log('Home with current user is working')
      res.render('home', { currentUser })
    })
    
    // CHARACTERS PAGE
    app.get('/characters', (req, res) => {
        var currentUser = req.user;
        console.log(req.cookies);
        Character.find({}).lean()
          .populate('author')
          .then(characters => {
            res.render('character-index', { characters , currentUser});
          })
          .catch(err => {
            console.log(err.message);
          })
    })

    // GET Create Character
    app.get('/character/new', (req, res) => {
        var currentUser = req.user;
        console.log('Loading character-new')
        res.render('character-new', { currentUser });
    })

    // POST CREATE CHARACTER
    app.post("/character/new", (req, res) => {
        if(req.user){
          const character = new Character(req.body);
          character.author = req.user._id
          // SAVE INSTANCE OF POST MODEL TO DB
          character.save((err, post) => {
            return res.redirect(`/characters`);
          })
          character
          .save()
          .then((character) => {
              return User.findById(req.user._id);
          })
          .then((user) => {
              user.characters.unshift(character);
              user.save();
              res.redirect(`/character/${character._id}`);
          })
          .catch(err => {
              console.log(err.message);
          });
        }
        else {
          return res.status(401); // UNAUTHORIZED
        }
    });

    // FIND CHARACTER WITH ID
    app.get("/characters/:id", function(req, res) {
        var currentUser = req.user;
        Character.findById(req.params.id).lean()
          .then(character => {
            res.render("character-show", { character, currentUser });
          })
          .catch(err => {
            console.log(err.message);
          });
    });

    // DISPLAY CHARACTERS WITH SAME BOOK
    app.get("/book/:book", function(req, res) {
      var currentUser = req.user;
      Character.find({ book: req.params.book }).lean()
        .then(characters => {
          res.render("character-index", { characters, currentUser });
        })
        .catch(err => {
          console.log(err.message);
        });
    });
  };