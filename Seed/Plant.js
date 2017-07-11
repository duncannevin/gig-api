const apps = require('./apps');
const users = require('./users');
const posted = require('./posted');
const bids = require('./bids');
const gigs = require('./gigs');

const fs = require('fs');
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'gig_app',
});

const HandleDatabase = require('../dist/db/HandleDatabase');

const allOfEM = {
apps: apps,
users: users,
posted: posted,
bids: bids,
gigs: gigs,
};

/**
* iterate table data
*/
const generateQuery = (data, table) => {

  const createRowAndParams = (obj) => {
    let result = {
      paramsResult: [],
      rowResult: [],
    };

    for (let key in obj) {

      switch(key) {
        case 'id':
          continue;
        case 'created_at':
          continue;
        case 'date_time':
          continue;
        default:
          result.rowResult.push(key);
          result.paramsResult.push(obj[key]);
      }
    }
    return result;
  };


  const createQuery = (rowAndParams) => {
    return `
      INSERT INTO ${table} (${rowAndParams.rowResult.join(',')})
      VALUES (${rowAndParams.paramsResult.map(_ => '?')})
    `;
  };

  const rowsNparams = createRowAndParams(data);
  rowsNparams.query = createQuery(rowsNparams);

  return rowsNparams;
}

for (name in allOfEM) {
  for (let i = 0; i < allOfEM[name].length; i++) {

    const qData = generateQuery(allOfEM[name][i], name);

    HandleDatabase.default(qData.paramsResult, qData.query, (err, data) => {
      if (err) {
        console.log('Seed insert failed', err);
        return;
      } else {
        console.log('Seed insert success');
      }
    });
  }
}
