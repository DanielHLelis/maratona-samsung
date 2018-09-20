const express = require('express');
var PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'));

const db = require('./database');

module.exports = function(app){
    app.get('/materias', function(req, res){
        console.log(req);
        require('../databaseOps/subjects')((results)=>{res.send(results); res.end(); }, req.query.filter);
    });
    app.get('/qstmat', function(req, res){
        require('../databaseOps/questoes')((results)=>{res.send(results); res.end();}, req.query.filter);
    });
}