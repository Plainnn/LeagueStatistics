var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
chai.use(chaiHttp);
var server = require('../../index');

describe('User Data', function() {
  it('Should get all the data about a users rank');
  it('Should get all the data about a users best and worst players');
});

it('Should get all the data about a users rank', done => {
  chai
    .request(server)
    .get('/api/v1/getrank/euw/autserene')
    .end(function(err, res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.data.should.have.property('summonerName');
      res.body.data.should.have.property('summmonerTier');
      res.body.data.should.have.property('summmonerRank');
      res.body.data.should.have.property('summonerWins');
      res.body.data.should.have.property('summonerWins');
      res.body.data.should.have.property('summonerLp');
      res.body.data.should.have.property('summonerLeagueName');
      done();
    });
});

it('Should get all the data about a users best and worst players', done => {
  chai
    .request(server)
    .get('/api/v1/euw/autserene')
    .end(function(err, res) {
      res.should.have.status(200);
      done();
    });
}).timeout(3000);
