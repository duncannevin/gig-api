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
          'created_at',
          'app_id',
        ]);
      });
  });
});

describe('GET api/users/getone/:username', () => {
  it('should respond with JSON object', () => {
    return chai.request(app).get('/api/users/Commodo.')
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
      });
  });

  it('should respond with correct information', () => {
    return chai.request(app).get('/api/users/Commodo.')
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res.body.username).to.equal('Commodo.');
      });
  });
});

describe('POST api/users/', () => {
  it('should post a new user', () => {
    return chai.request(app).post('/api/users/').send({
      "app_id": "1",
      "id": 2,
      "username": "Id.",
      "first_name": "Janett",
      "last_name": "Brier",
      "profile_pic_url": "img2.png",
      "created_at": "Tue Jun 23 2015 03:39:53 GMT-0400 (EDT)"
    })
      .then(res => {
        expect(res.status).to.equal(201);
        expect(res.body.warningCount).should.equal(0);
      });
  });
});
