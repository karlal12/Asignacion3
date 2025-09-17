const db = require('../config/db');

class CarreraDao {
    constructor() {}

    // Insertar una nueva carrera
    insertarCarrera(carrera, callback) {
        const insertQuery = 'INSERT INTO carreras (titulo) VALUES (?)';
        db.query(insertQuery, [carrera.titulo], (err, result) => {
            if (err) {
                callback(err);
            } else {
                callback(null, result);
            }
        });
    }

    // Seleccionar todas los carreras
    obtenerTodas(callback) {
        const selectQuery = 'SELECT * FROM carreras';
        db.query(selectQuery, (err, results) => {
            if (err) {
                callback(err);
            } else {
                callback(null, results);
            }
        });
    }

    // Actualizar una carrera por ID
    actualizarCarrera(carrera, callback) {
        const updateQuery = 'UPDATE carreras SET titulo = ? WHERE id = ?';
        db.query(updateQuery, [carrera.titulo, carrera.id], (err, result) => {
            if (err) {
                callback(err);
            } else {
                callback(null, result);
            }
        });
    }

    // Eliminar una carrera por ID
    eliminarCarrera(id, callback) {
        const deleteQuery = 'DELETE FROM carreras WHERE id = ?';
        db.query(deleteQuery, [id], (err, result) => {
            if (err) {
                callback(err);
            } else {
                callback(null, result);
            }
        });
    }
}

module.exports = new CarreraDao();