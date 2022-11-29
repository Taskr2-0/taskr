const { Pool } = require('pg');

const { PG_URI, TEST_URI } = require('../../credentials.js');

const connectionString = process.env.NODE_ENV === 'test' ? TEST_URI : PG_URI;

const pool = new Pool({
  connectionString
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};