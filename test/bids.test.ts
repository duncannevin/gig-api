import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

/**
* tests get all bids
*/
describe('GET api/bids', () => {
  it('responds with JSON array', () => {
    return chai.request(app).get('/api/bids')
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('array');
      });
  });

  it('should include correct properties.', () => {
    return chai.request(app).get('/api/bids')
      .then(res => {
        expect(res.body[0]).to.have.all.keys([
          'posted_id',
          'username',
          'price',
          'date_time',
          'app_id',
          'id'
        ]);
      });
  });
});

/**
* tests get all bids based on gig_id
*/
describe('GET api/bids/postedid/:posted_id', () => {
  it('should respond with appropriate bids', () => {
    return chai.request(app).get('/api/bids/postedid/123452')
      .then(res => {
        let one = res.body;

        expect(one).to.be.an('array');
        expect(one).to.have.length(1);
      });
  });
});

/**
* tests get all bids based on username
*/
describe('GET api/bids/username/:username', () => {
  it('should respond with appropriate bids', () => {
    return chai.request(app).get('/api/bids/username/Id.')
      .then(res => {
        let one = res.body;

        expect(one).to.be.an('array');
        expect(one).to.have.length(7);
      });
  });
});

/**
* tests being able to post a new bids
*/
describe('POST api/bids/', () => {

  it('should add a single entry', () => {
    return chai.request(app).post('/api/bids/')
    .send({
      app_id: '12345',
      posted_id: '123451',
      username: 'Tempor.',
      price: 19999
    })
      .then(res => {
        expect(res.body).to.be.an('object');
        expect(res.body.warningCount).to.equal(0);
        expect(res.body.affectedRows).to.equal(1);
      });
  });
});
