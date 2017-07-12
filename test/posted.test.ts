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
    return chai.request(app)
    .get('/api/posted')
    .set('ACCESS_KEY', '12345')
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('array');
      });
  });

  it('should include correct properties', () => {
    return chai.request(app)
    .get('/api/posted')
    .set('ACCESS_KEY', '12345')
      .then(res => {
        expect(res.body[0]).to.have.all.keys([
          'id',
          'posted_id',
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
    return chai.request(app)
    .get('/api/posted/user/Tempor.')
    .set('ACCESS_KEY', '12345')
      .then(res => {
        let posts = res.body;

        expect(posts).to.be.an('array');
        expect(posts[0].username).to.equal('Tempor.');
      });
  });
});

/**
* tests adding a post to posted
*/
describe('POST api/posted/', () => {
  it('should post a new post', () => {
    return chai.request(app)
    .post('/api/posted')
    .set('ACCESS_KEY', '12345')
    .send({
      posted_id: '12345',
      username: 'Id.',
      price_range: '10 - 29',
      project: 'Mow my lawn three times per week',
      app_id: '12345',
      skills: "['book', 'run', 'jump']"
    })
      .then(res => {
        expect(res.body.warningCount).to.equal(0);
        expect(res.body.affectedRows).to.equal(1);
      });
  });
});
