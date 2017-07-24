import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';
import handleDatabase from '../src/db/HandleDatabase';

chai.use(chaiHttp);
const expect = chai.expect;

/**
* tests get all gigs
*/
describe('GET api/gigs', () => {
  it('responds with JSON array', () => {
    return chai.request(app)
    .get('/api/gigs')
    .set('ACCESS_KEY', '12345')
    .set('app_id', '67890')
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('array');
      });
  });

  it('should include correct properties', () => {
    return chai.request(app)
    .get('/api/gigs')
    .set('ACCESS_KEY', '12345')
    .set('app_id', '67890')
      .then(res => {
        expect(res.body[0]).to.have.all.keys([
          'id',
          'app_id',
          'freelancer',
          'customer',
          'price',
          'complete',
          'final_price',
          'freelancer_rating',
          'customer_rating',
          'gig_id',
        ]);
      });
  });
});

/**
* tests post a new gig to the gigs table
*/
describe('POST api/gigs/', () => {

  it('should add a new gig', () => {
    return chai.request(app)
    .post('/api/gigs/')
    .set('ACCESS_KEY', '12345')
    .set('app_id', '67890')
    .send({
      app_id: '12345',
      freelancer: 'Ultrices.',
      customer: 'Nibh.',
      price: 10,
      complete: false,
      final_price: 0,
      freelancer_rating: -1,
      customer_rating: -1
    })
      .then(res => {
        expect(res.body.warningCount).to.equal(0);
        expect(res.body.affectedRows).to.equal(1);

        const queryStr: string = `
          DELETE FROM gigs
          WHERE customer=?
        `;

        handleDatabase(['Nibh.'], queryStr, (err, data) => {
          if (err) {
            console.log('DIDNT DELETE GIG');
          }
          console.log('GIG FROM TEST DELETED');
        });
      });
  });
});

/**
* tests get all gigs based on freelancer username
*/
describe('GET api/gigs/freelancer/:freelancer', () => {

  it('should respond with the correct freelancer', () => {
    return chai.request(app)
    .get('/api/gigs/freelancer/Farfegnutty.')
    .set('ACCESS_KEY', '12345')
    .set('app_id', '67890')
      .then(res => {
        let gigs = res.body;

        expect(gigs).to.be.an('array');
        expect(gigs).to.have.length(5);
        expect(gigs[gigs.length-1].freelancer).to.equal('Farfegnutty.');
      });
  });
});

/**
* tests get all gigs based on customer username
*/
describe('GET api/gigs/customer/:customer', () => {

  it('should respond with the correct customer', () => {
    return chai.request(app)
    .get('/api/gigs/customer/Id.')
    .set('ACCESS_KEY', '12345')
    .set('app_id', '67890')
      .then(res => {
        let gigs = res.body;

        expect(gigs).to.be.an('array');
        expect(gigs[0].freelancer).to.equal('Farfegnutty.');
      });
  });
});
