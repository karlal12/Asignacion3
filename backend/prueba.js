const db = require('./config/db');

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexión exitosa a la base de datos.');


    // Cierra la conexión cuando hayas terminado
    db.end((err) => {
        if (err) {
            console.error('Error al desconectar de la base de datos:', err);
        } else {
            console.log('Desconexión exitosa de la base de datos.');
        }
    });
});
