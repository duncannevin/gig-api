import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET api/users', () => {
  it('responds with JSON array', () => {
    return chai.request(app).get('/api/users')
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.length(20);
      });
  });

  it('should include Tempor.', () => {
    return chai.request(app).get('/api/users')
      .then(res => {
        let Tempor = res.body.find(user => user.username === 'Tempor.');

        expect(Tempor).to.exist;
        expect(Tempor).to.have.all.keys([
          'id',
          'username',
          'first_name',
          'last_name',
          'profile_pic_url',
          'joined_date',
          'rating',
        ]);
      });
  });
});
