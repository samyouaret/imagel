require('dotenv').config({ debug: true });
// to ignore error encoding not recognized
require('mysql2/node_modules/iconv-lite').encodingExists('foo');
const request = require('supertest');

global.request = request;
jest.setTimeout(60000); // in milliseconds

// Fail tests on any warning