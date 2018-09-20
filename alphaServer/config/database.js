var PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'));

var db = new PouchDB('http://localhost:5984/questoes');

module.exports = db;