import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

describe('Tests if access key lock works', () => {
  it('should fail with bad access key', () => {
    return chai.request(app)
    .get('/api/users')
    .set('ACCESS_KEY', '12347')
      .then(res => {
      })
      .catch(err => {
        expect(err.status).to.equal(302);
      });
  });

  it('should be fine with good access key', () => {
    return chai.request(app)
    .get('/api/users')
    .set('ACCESS_KEY', '12345')
      .then(res => {
        expect(res.status).to.equal(200);
      })
  });
});
