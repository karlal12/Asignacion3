const AlumnoDao = require('./dataAccess/alumnoDAO');
const Alumno = require('./models/alumnoModel');
const db = require('./config/db');

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos.');

  // Ejemplo de inserción de un alumno
  const nuevoAlumno = new Alumno(null, 'Juan Torres');

  AlumnoDao.insertarAlumno(nuevoAlumno, (err, result) => {
    if (err) {
      console.error('Error al insertar el alumno:', err);
    } else {
      console.log('Alumno insertado con éxito.');
    }
  });

// Ejemplo de selección de todos los alumnos

// Ejemplo de actualización de un alumno

// Ejemplo de eliminación de un alumno por su ID


// Cierra la conexión cuando hayas terminado
db.end((err) => {
        if (err) {
        console.error('Error al desconectar de la base de datos:', err);
        } else {
        console.log('Desconexión exitosa de la base de datos.');
        }
    });
});
