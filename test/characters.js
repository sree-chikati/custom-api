//test/posts.js
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const expect = chai.expect;
const should = chai.should();
chai.use(chaiHttp);

// Agent that will keep track of our cookies
const agent = chai.request.agent(server);


// CODE STARTS HERE
const Character = require('../models/character');
const User = require("../models/user");


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

    const user = {
        username: 'usertest',
        password: 'passtest'
    }

    before(function (done) {
        agent
        .post('/sign-up')
        .set("content-type", "application/x-www-form-urlencoded")
        .send(user)
        .then(function(res) {
            done();
        })
        .catch(function(err) {
            done(err);
        });
    });

    it('Should create character valid attributes at POST /character/new', function(done) {
        Character.estimatedDocumentCount()
        .then(function (initialDocCount) {
            agent
            .post("/character/new")
            //forms character
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
    after(function (done) {
        Character.findOneAndDelete(newCharacter)
        .then(function (res) {
            agent.close()
      
            User.findOneAndDelete({
                username: user.username
            })
              .then(function (res) {
                  done()
              })
              .catch(function (err) {
                  done(err);
              });
        })
        .catch(function (err) {
            done(err);
        });
    });
    
});