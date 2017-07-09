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
        expect(res.body).to.have.length(10);
      });
  });

  it('should include Iaculis.', () => {
    return chai.request(app).get('/api/bids')
      .then(res => {
        let Tempor = res.body.find(user => user.username === 'Iaculis.');

        expect(Tempor).to.exist;
        expect(Tempor).to.have.all.keys([
          'gig_id',
          'username',
          'price',
          'date_time',
          'app_id',
        ]);
      });
  });
});

/**
* tests get all bids based on gig_id
*/
describe('GET api/bids/gig/:gig_id', () => {
  it('should respond with appropriate bids', () => {
    return chai.request(app).get('/api/bids/gig/1')
      .then(res => {
        let one = res.body;

        expect(one).to.be.an('array');
        expect(one).to.have.length(4);
      });
  });
});

/**
* tests get all bids based on username
*/
describe('GET api/bids/biduser/:username', () => {
  it('should respond with appropriate bids', () => {
    return chai.request(app).get('/api/bids/user/Iaculis.')
      .then(res => {
        let one = res.body;

        expect(one).to.be.an('array');
        expect(one).to.have.length(2);
      });
  });
});
