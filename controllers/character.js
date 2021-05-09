const character = require('../models/character');
const Character = require('../models/character');

module.exports = app => {
    
    // INDEX
    app.get('/characters', (req, res) => {
        Character.find({}).lean()
          .then(characters => {
            res.render('character-index', { characters });
          })
          .catch(err => {
            console.log(err.message);
          })
      })

    // GET Create Character
    app.get('/character/new', (req, res) => {
        console.log('Loading character-new')
        res.render('character-new');
    })

    // POST CREATE CHARACTER
    app.post("/character/new", (req, res) => {
        // save this instance of character model
        const character = new Character(req.body);

        // save this instance of character model to db
        character.save((err, post) => {
            // REDIRECT TO THE ROOT
            return res.redirect(`/`);
          })
    });

    // FIND CHARACTER WITH IDÅ
    app.get("/characters/:id", function(req, res) {
        // LOOK UP THE POST
        Character.findById(req.params.id).lean()
          .then(character => {
            res.render("character-show", { character });
          })
          .catch(err => {
            console.log(err.message);
          });
    });

    // DISPLAY CHARACTERS WITH SAME BOOK
    app.get("/book/:book", function(req, res) {
      Character.find({ book: req.params.book }).lean()
        .then(characters => {
          res.render("character-index", { characters });
        })
        .catch(err => {
          console.log(err.message);
        });
    });
  };