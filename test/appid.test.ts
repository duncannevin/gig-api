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
          'access_key'
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

        expect(app).to.be.an('array');
        expect(app).to.have.length(1);
        expect(app[0].app_id).to.equal('67890');
        expect(app[0].access_key).to.equal('12345');
      });
  });
});

/**
* tests post request to apps
*/
describe('POST app/apps/', () => {
  it('should add a single entry to apps', () => {
    return chai.request(app)
    .post('/api/apps/')
    .set('KING_KEY', 'whereareyou')
    .send({access_key: 'lockit'})
      .then(res => {
        expect(res).to.have.status(200);
      });

  });

  it('should have created an app_id when one is not added', () => {
    return chai.request(app).get('/api/apps/getone/testingitout').set('KING_KEY', 'whereareyou')
      .then(res => {
        const app = res.body;

        expect(app).to.be.an('array');
        expect(app).to.have.length(1);
        expect(app[0].app_id).to.equal('testingitout');
        expect(app[0].access_key).to.equal('lockit');
      });
  });
});
