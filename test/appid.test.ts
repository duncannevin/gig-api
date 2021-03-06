import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';
import handleDatabase from '../src/db/HandleDatabase';

chai.use(chaiHttp);
const expect = chai.expect;

/**
* tests if missing king key
*/
describe('GET api/apps WITHOUT king key', () => {
  it('should respond with Forbidden error', () => {
    return chai.request(app)
    .get('/api/apps')
    .set('ACCESS_KEY', '12345')
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
    return chai.request(app)
    .get('/api/apps')
    .set('KING_KEY', 'whereareyou')
    .set('ACCESS_KEY', '12345')
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('array');
      });
  });

  it('should include 12345', () => {
    return chai.request(app)
    .get('/api/apps')
    .set('KING_KEY', 'whereareyou')
    .set('ACCESS_KEY', '12345')
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
    return chai.request(app)
    .get('/api/apps/getone/67890')
    .set('KING_KEY', 'whereareyou')
    .set('ACCESS_KEY', '12345')
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
    .set('ACCESS_KEY', '12345')
    .send({access_key: 'lockit'})
      .then(res => {
        expect(res.body).to.have.property('app_id');
        expect(res).to.have.status(200);

        const queryStr: string = `
          DELETE FROM apps
          WHERE access_key=?
        `;

        handleDatabase(['lockit'], queryStr, (err, data) => {
          if (err) {
            console.log('DIDNT DELETE APP');
          }
          console.log('APP FROM TEST DELETED');
        });
      });

  });
});
