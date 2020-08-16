require('dotenv').config({ debug: true });
// to ignore error encoding not recognized
require('mysql2/node_modules/iconv-lite').encodingExists('foo');
const request = require('supertest');
const Application = require('./app/Application');
const { urlencode, urldecode } = require('./helpers/url');

const app = new Application();

global.request = request;
global.app = app;
global.urlencode = urlencode;
global.urldecode = urldecode;
jest.setTimeout(60000); // in milliseconds

// Fail tests on any warning