const app = require("./../server");
const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();

chai.use(chaiHttp);

describe("Site", function() {
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

});