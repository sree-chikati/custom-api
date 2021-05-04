const app = require("./../server");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

const Character = require('../models/character');
const server = require('../server');

chai.should();
chai.use(chaiHttp);

describe('Characters', function() {
  const agent = chai.request.agent(server);
  // Character for testing purposes
    const newCharacter = {
        name: 'Mel',
        book: 'Imaginary',
        age: '21',
        species: 'Human',
        powers: 'Animal Taming',
        summary: 'Character that does not exist in the book'
    };

    it('Should create character valid attributes at POST /character/new', function(done) {
        Character.estimatedDocumentCount()
        .then(function (initialDocCount) {
            agent
            .post("/character/new")
            //This line fakes a form character, since we're not actually filing out a form
            .set("content-type", "application/x-www-form-urlencoded")
            //make a request to create another
            .send(newCharacter)
            .then(function (res) {
                Character.estimatedDocumentCount()
                .then(function (newDocCount) {
                    expect(res).to.have.status(200);
                    expect(newDocCount).to.be.equal(initialDocCount + 1)
                    done();
                })
                .catch(function (err) {
                    done(err);
                });
            })
            .catch(function (err) {
                done(err);
            });
        })
        .catch(function (err) {
            done(err)
        });
    });

    // Will remove character after test is done
    after(function () {
        Character.findOneAndDelete(newCharacter);
      });
    
});