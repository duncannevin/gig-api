import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

/**
* tests get all posted
*/
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
          'project',
          'app_id',
          'skills',
        ]);
      });
  });
});

/**
* tests getting all posted based on username
*/
describe('GET api/posted/user/:username', () => {
  it('should respond with correct users posts', () => {
    return chai.request(app).get('/api/posted/user/Purus.')
      .then(res => {
        let posts = res.body;

        expect(posts).to.be.an('array');
        expect(posts).to.have.length(2);
        expect(posts[0].username).to.equal('Purus.');
      });
  });
});
