const express = require('express');
var PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'));

const db = require('./database');

module.exports = function(app){
    app.get('/materias', function(req, res){

        
        res.send();
})
};


