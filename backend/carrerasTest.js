const CarreraDao = require('./dataAccess/carreraDAO');
const Carrera = require('./models/carreraModel');
const db = require('./config/db');

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos.');

  // Ejemplo de inserción de una carrera
  const nuevaCarrera = new Carrera(null, 'Medicina');

  CarreraDao.insertarCarrera(nuevaCarrera, (err) => {
    if (err) {
      console.error('Error al insertar la carrera:', err);
    } else {
      console.log('Carrera insertada con éxito.');
    }
  });

  // Ejemplo de actualización de carrera
  const carreraActualizada = new Carrera(3, 'Arquitectura');
      CarreraDao.actualizarCarrera(carreraActualizada, (err) => {
        if (err) {
          console.error('Error al actualizar la carrera:', err);
          return;
        }
        console.log('Carrera actualizada con éxito.');
    });

    // Ejemplo de eliminación de carrera
    CarreraDao.eliminarCarrera(4, (err) => {
          if (err) {
            console.error('Error al eliminar la carrera:', err);
          } else {
            console.log('Carrera eliminada con éxito.');
          }
        });


  // Ejemplo de consulta de carreras
  CarreraDao.obtenerTodas((err, carreras) => {
      if (err) {
        console.error('Error al obtener carreras:', err);
        return;
      }
      console.log('Lista de carreras:', carreras);

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
