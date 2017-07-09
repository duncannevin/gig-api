import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET api/posted', () => {
  it('responds with JSON array', () => {
    return chai.request(app).get('/api/posted')
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.length(10);
      });
  });

  it('should include Tempor.', () => {
    return chai.request(app).get('/api/posted')
      .then(res => {
        let Condimentum = res.body.find(post => post.username === 'Condimentum.');

        expect(Condimentum).to.exist;
        expect(Condimentum).to.have.all.keys([
          'id',
          'username',
          'date_time',
          'price_range',
          'average_bid',
          'project'
        ]);
      });
  });
});
