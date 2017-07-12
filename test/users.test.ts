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
      });
  });

  it('should include all correct properties', () => {
    return chai.request(app).get('/api/users')
      .then(res => {

        expect(res.body[0]).to.have.all.keys([
          'id',
          'username',
          'first_name',
          'last_name',
          'profile_pic_url',
          'created_at',
          'app_id',
        ]);
      });
  });
});

describe('GET api/users/getone/:username', () => {
  it('should respond with JSON object', () => {
    return chai.request(app).get('/api/users/Farfegnutty.')
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('array');
      });
  });

  it('should respond with correct information', () => {
    return chai.request(app).get('/api/users/Farfegnutty.')
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res.body[0].username).to.equal('Farfegnutty.');
        expect(res.body).to.have.length(1);
      });
  });
});

describe('POST api/users/', () => {
  it('should post a new user', () => {
    return chai.request(app).post('/api/users/').send({
      "app_id": "12345",
      "username": "Id.",
      "first_name": "Janett",
      "last_name": "Brier",
      "profile_pic_url": "img2.png"
    })
      .then(res => {
        expect(res.status).to.equal(201);
        expect(res.body.warningCount).to.equal(0);
        expect(res.body.affectedRows).to.equal(1);
      });
  });
});
