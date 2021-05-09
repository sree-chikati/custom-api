const app = require("./../server");
const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();

chai.use(chaiHttp);

describe("Site", function() {
  // Home
  it("should check for home page", function(done) {
    chai
      .request(app)
      .get("/")
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        res.status.should.be.equal(200);
        return done();
      });
  });

  // Characters
  it("should check for characters page", function(done) {
    chai
      .request(app)
      .get("/characters")
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        res.status.should.be.equal(200);
        return done();
      });
  });

  // Login
  it("should check for login", function(done) {
    chai
      .request(app)
      .get("/login")
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        res.status.should.be.equal(200);
        return done();
      });
  });

  // Sign-ip
  it("should check for sign-up", function(done) {
    chai
      .request(app)
      .get("/sign-up")
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        res.status.should.be.equal(200);
        return done();
      });
  });

  // Logout
  it("should check for logout", function(done) {
    chai
      .request(app)
      .get("/logout")
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        res.status.should.be.equal(200);
        return done();
      });
  });

});