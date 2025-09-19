const db = require('../config/db');

class AlumnoDao {
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

    // Insertar un nuevo alumno con transacción
    insertarAlumno(alumno, callback) {
        this.ejecutarConTransaccion((transaccionCallback) => {
            const insertQuery = 'INSERT INTO alumnos (nombre, carrera) VALUES (?, ?)';
            db.query(insertQuery, [alumno.nombre, alumno.carrera], (err, result) => {
                if (err) {
                    transaccionCallback(err);
                } else {
                    transaccionCallback(null, result);
                }
            });
        }, callback);
    }

    // Seleccionar todos los alumnos
    obtenerTodos(callback) {
        const selectQuery = 'SELECT * FROM alumnos';
        db.query(selectQuery, (err, results) => {
            if (err) {
                callback(err);
            } else {
                callback(null, results);
            }
        });
    }

    // Actualizar un alumno por ID con transacción
    actualizarAlumno(alumno, callback) {
        this.ejecutarConTransaccion((transaccionCallback) => {
            const updateQuery = 'UPDATE alumnos SET nombre = ?, carrera = ? WHERE id = ?';
            db.query(updateQuery, [alumno.nombre, alumno.carrera, alumno.id], (err, result) => {
                if (err) {
                    transaccionCallback(err);
                } else {
                    transaccionCallback(null, result);
                }
            });
        }, callback);
    }

    // Eliminar un alumno por ID con transacción
    eliminarAlumno(id, callback) {
        this.ejecutarConTransaccion((transaccionCallback) => {
            const deleteQuery = 'DELETE FROM alumnos WHERE id = ?';
            db.query(deleteQuery, [id], (err, result) => {
                if (err) {
                    transaccionCallback(err);
                } else {
                    transaccionCallback(null, result);
                }
            });
        }, callback);
    }

    // Obtener un alumno por ID (sin transacción ya que es solo lectura)
    obtenerAlumnoPorId(id, callback) {
        const selectQuery = 'SELECT * FROM alumnos WHERE id = ?';
        db.query(selectQuery, [id], (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results[0]);
            }
        });
    }

}

module.exports = new AlumnoDao();