import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

/**
* tests get all gigs
*/
describe('GET api/gigs', () => {
  it('responds with JSON array', () => {
    return chai.request(app).get('/api/gigs')
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.length(5);
      });
  });

  it('should include Lectus.', () => {
    return chai.request(app).get('/api/gigs')
      .then(res => {
        let Lectus = res.body.find(gig => gig.freelancer === 'Lectus.');

        expect(Lectus).to.exist;
        expect(Lectus).to.have.all.keys([
          'id',
          'freelancer',
          'customer',
          'price',
          'complete',
          'final_price'
        ]);
      });
  });
});

/**
* tests get all gigs based on freelancer username
*/
describe('GET api/gigs/freelancer/:freelancer', () => {

  it('should respond with the correct freelancer', () => {
    return chai.request(app).get('/api/gigs/freelancer/Lectus.')
      .then(res => {
        let gigs = res.body;

        expect(gigs).to.be.an('array');
        expect(gigs).to.have.length(2);
      });
  });
});

/**
* tests get all gigs based on customer username
*/
describe('GET api/gigs/customer/:customer', () => {

  it('should respond with the correct freelancer', () => {
    return chai.request(app).get('/api/gigs/customer/Velit.')
      .then(res => {
        let gigs = res.body;

        expect(gigs).to.be.an('array');
        expect(gigs).to.have.length(2);
      });
  });
});
