var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'certificates'
});

connection.connect(function(err) {
    if (err) throw err;
    else 
    console.log("success");
});

module.exports = connection;

