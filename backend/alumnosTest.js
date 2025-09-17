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

  AlumnoDao.insertarAlumno(nuevoAlumno, (err) => {
    if (err) {
      console.error('Error al insertar el alumno:', err);
    } else {
      console.log('Alumno insertado con éxito.');
    }
  });

  // Ejemplo de actualización de alumno
  const alumnoActualizado = new Alumno(3, 'Mariana Lopez', 'Ingeniería en Sistemas');
      AlumnoDao.actualizarAlumno(alumnoActualizado, (err) => {
        if (err) {
          console.error('Error al actualizar el alumno:', err);
          return;
        }
        console.log('Alumno actualizado con éxito.');
    });

    // Ejemplo de eliminación de alumno
    AlumnoDao.eliminarAlumno(5, (err) => {
          if (err) {
            console.error('Error al eliminar el alumno:', err);
          } else {
            console.log('Alumno eliminado con éxito.');
          }
        });


  // Ejemplo de consulta de alumnos
  AlumnoDao.obtenerTodos((err, alumnos) => {
      if (err) {
        console.error('Error al obtener alumnos:', err);
        return;
      }
      console.log('Lista de alumnos:', alumnos);

    });

    cerrarConexion();

});

// Función para cerrar la conexión
function cerrarConexion() {
  db.end((err) => {
    if (err) {
      console.error('Error al desconectar de la base de datos:', err);
    } else {
      console.log('Desconexión exitosa de la base de datos.');
    }
  });
}
