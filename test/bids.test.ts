import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

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

  it('should include Tempor.', () => {
    return chai.request(app).get('/api/bids')
      .then(res => {
        let Tempor = res.body.find(user => user.username === 'Iaculis.');

        expect(Tempor).to.exist;
        expect(Tempor).to.have.all.keys([
          'gig_id',
          'username',
          'price',
          'date_time'
        ]);
      });
  });
});
