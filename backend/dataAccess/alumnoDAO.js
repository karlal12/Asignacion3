const db = require('../config/db');

class AlumnoDao {
    constructor() {}

    // Insertar un nuevo alumno
    insertarAlumno(alumno, callback) {
        const insertQuery = 'INSERT INTO alumnos (nombre) VALUES (?)';
        db.query(insertQuery, [alumno.nombre], (err, result) => {
            if (err) {
                callback(err);
            } else {
                callback(null, result);
            }
        });
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

    // Actualizar un alumno por ID
    actualizarAlumno(alumno, callback) {
        const updateQuery = 'UPDATE alumnos SET nombre = ?, carrera = ? WHERE id = ?';
        db.query(updateQuery, [alumno.nombre, alumno.carrera, alumno.id], (err, result) => {
            if (err) {
                callback(err);
            } else {
                callback(null, result);
            }
        });
    }

    // Eliminar un alumno por ID
    eliminarAlumno(id, callback) {
        const deleteQuery = 'DELETE FROM alumnos WHERE id = ?';
        db.query(deleteQuery, [id], (err, result) => {
            if (err) {
                callback(err);
            } else {
                callback(null, result);
            }
        });
    }

    // Obtener un alumno por ID
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