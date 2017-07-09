import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

/**
* tests if missing king key
*/
describe('GET api/apps WITHOUT king key', () => {
  it('should respond with Forbidden error', () => {
    return chai.request(app).get('/api/apps')
      .then(res => {
      })
      .catch(err => {
        expect(err.status).to.equal(403);
      });
  });
});

/**
* tests get all apps
*/
describe('GET api/apps', () => {
  it('responds with JSON array', () => {
    return chai.request(app).get('/api/apps').set('KING_KEY', 'whereareyou')
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.length(2);
      });
  });

  it('should include 12345', () => {
    return chai.request(app).get('/api/apps').set('KING_KEY', 'whereareyou')
      .then(res => {
        let appId = res.body.find(app => app.app_id === '12345');

        expect(appId).to.exist;
        expect(appId).to.have.all.keys([
          'id',
          'app_id',
          'key'
        ]);
      });
  });
});

/**
* tests getting one app bases on app_id
*/
describe('GET api/apps/getone/:app_id', () => {
  it('should respond with correct app', () => {
    return chai.request(app).get('/api/apps/getone/67890').set('KING_KEY', 'whereareyou')
      .then(res => {
        const app = res.body;

        expect(app).to.be.an('object');
        expect(app.id).to.equal('1');
      });
  });
});
