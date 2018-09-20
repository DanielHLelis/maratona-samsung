const db = require('../config/database');

module.exports = function(method, filter){
    db.find({
        selector: (!filter || filter==='*')?({materias: {$ne: ''}}):({materias: {$eq: filter}}),
        fields: ['materias', '_id']
      }, (err, result) => {
        if (err) { 
            return console.error(err); 
        }
        method(result);
    })
};
