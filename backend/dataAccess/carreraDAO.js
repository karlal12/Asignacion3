const db = require('../config/db');

class CarreraDao {
    constructor() {}
    
    ejecutarConTransaccion(operaciones, callback) {
        db.beginTransaction((err) => {
            if (err) {
                return callback(err);
            }

            operaciones((error, resultados) => {
                if (error) {
                    return db.rollback(() => {
                        callback(error);
                    });
                }

                db.commit((commitError) => {
                    if (commitError) {
                        return db.rollback(() => {
                            callback(commitError);
                        });
                    }
                    callback(null, resultados);
                });
            });
        });
    }

    // Insertar una nueva carrera con transacción
    insertarCarrera(carrera, callback) {
        this.ejecutarConTransaccion((transaccionCallback) => {
            const insertQuery = 'INSERT INTO carreras (titulo) VALUES (?)';
            db.query(insertQuery, [carrera.titulo], (err, result) => {
                if (err) {
                    transaccionCallback(err);
                } else {
                    transaccionCallback(null, result);
                }
            });
        }, callback);
    }

    // Seleccionar todas las carreras
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

    // Actualizar una carrera por ID con transacción
    actualizarCarrera(carrera, callback) {
        this.ejecutarConTransaccion((transaccionCallback) => {
            const updateQuery = 'UPDATE carreras SET titulo = ? WHERE id = ?';
            db.query(updateQuery, [carrera.titulo, carrera.id], (err, result) => {
                if (err) {
                    transaccionCallback(err);
                } else {
                    transaccionCallback(null, result);
                }
            });
        }, callback);
    }

    // Eliminar una carrera por ID con transacción
    eliminarCarrera(id, callback) {
        this.ejecutarConTransaccion((transaccionCallback) => {
            const deleteQuery = 'DELETE FROM carreras WHERE id = ?';
            db.query(deleteQuery, [id], (err, result) => {
                if (err) {
                    transaccionCallback(err);
                } else {
                    transaccionCallback(null, result);
                }
            });
        }, callback);
    }

    // Obtener una carrera por ID
    obtenerCarreraPorId(id, callback) {
        const selectQuery = 'SELECT * FROM carreras WHERE id = ?';
        db.query(selectQuery, [id], (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results[0]);
            }
        });
    }
}

module.exports = new CarreraDao();