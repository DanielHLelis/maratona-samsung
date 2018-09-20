const db = require('../config/database');

module.exports = function(method, filter){
    db.find({
        selector: {id: filter},
        fields: ['materias']
    }), (err, result) => {
        if(err) {
            return console.error(err);
        }
        var aux = result
    }
}