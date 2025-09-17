const db = require('../config/db');

class AlumnoDao {
    constructor() { }

    // Insertar un nuevo alumno (grave acento) ALT 96
    insertarAlumno(alumno, callback) {
        const insertQuery = `INSERT INTO alumnos (nombre) VALUES ('${alumno.nombre}')`;

        db.query(insertQuery, (err, result) => {
            if (err) {
                callback(err);
            } else {
                callback(null, result);
            }
        });
    }
    // Seleccionar todos los alumnos (agrega el código correspondiente)
    // Actualizar un alumno (agrega el código correspondiente)
    // Eliminar un alumno por su ID (agrega el código correspondiente)
}
module.exports = new AlumnoDao();
