import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';
import handleDatabase from '../src/db/HandleDatabase';

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
    .set('app_id', '67890')
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
    .set('app_id', '67890')
      .then(res => {
        expect(res.body[0]).to.have.all.keys([
          'id',
          'posted_id',
          'username',
          'date_time',
          'price_range',
          'description',
          'app_id',
          'skills',
          'payment_type',
          'price_per',
          'type',
        ]);
      });
  });
});

/**
* tests getting all posted based on username
*/
describe('GET api/posted/user/:username/:type', () => {
  it('should respond with correct users posts', () => {
    return chai.request(app)
    .get('/api/posted/user/Tempor./job')
    .set('ACCESS_KEY', '12345')
    .set('app_id', '67890')
      .then(res => {
        let posts = res.body;

        expect(posts).to.be.an('array');
        expect(posts[0].username).to.equal('Tempor.');
      });
  });
});

/*
* tests get query to see if it is able to find posted
* based on a query and type
**/
describe('GET api/posted/query/:query/:type', () => {
  it('should respond with correct user posts', () => {
    return chai.request(app)
      .get('/api/posted/query/frogging/product')
      .set('ACCESS_KEY', '12345')
      .set('app_id', '67890')
        .then(res => {
          const posts = res.body;

          expect(posts).to.be.an('array');
          expect(posts).to.have.length(2);
        });
  });
});

/*
* tests get all based on type
**/
describe('GET api/posted/getbytype/:type', () => {
  it('should respond with correct type posts', () => {
    return chai.request(app)
      .get('/api/posted/getbytype/job')
      .set('ACCESS_KEY', '12345')
      .set('app_id', '67890')
        .then(res => {
          const posts = res.body;

          expect(posts).to.be.an('array');
          expect(posts).to.have.length(3);
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
    .set('app_id', '67890')
    .send({
      posted_id: '12345',
      username: 'Id.',
      price_range: '10 - 29',
      description: 'Mow my lawn three times per week',
      app_id: '12345',
      skills: "['book', 'run', 'jump']",
      payment_type: 'BTC',
      price_per: 'Hour',
      type: 'job',
    })
      .then(res => {
        expect(res.body.warningCount).to.equal(0);
        expect(res.body.affectedRows).to.equal(1);

        const queryStr: string = `
          DELETE FROM posted
          WHERE username=?
        `;

        handleDatabase(['Id.'], queryStr, (err, data) => {
          if (err) {
            console.log('DIDNT DELETE POST');
          }
          console.log('POST FROM TEST DELETED');
        });
      });
  });
});

