const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'cambiarpasss',
  database: 'emergentes_asignacion_tres',
});

module.exports = connection;
