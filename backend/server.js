const http = require('http');
const carreraDAO = require('./dataAccess/carreraDAO');
const alumnoDAO = require('./dataAccess/alumnoDAO')

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS, PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204); return res.end();
  }
  //CARRERAS
  if (req.method === 'POST' && req.url === '/carreras') {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => {
      const data = JSON.parse(body || '{}');
      if (!data.titulo) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Falta el título' }));
      }

      carreraDAO.insertarCarrera({ titulo: data.titulo }, (err, result) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: err.message }));
        } else {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ id: result.insertId }));
        }
      });
    });
    return;
  }

  if (req.method === 'GET' && req.url === '/carreras') {
    carreraDAO.obtenerTodas((err, resultados) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error al obtener carreras' }));
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(resultados));
      }
    });
    return;
  }

  // Eliminar una carrera
  if (req.method === 'DELETE' && req.url.startsWith('/carreras/')) {
    const id = req.url.split('/')[2];
    carreraDAO.eliminarCarrera(id, (err) => {
      if (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error al eliminar carrera' }));
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true }));
      }
    });
    return;
  }

  //Actualizar una carrera
  if (req.method === 'PUT' && req.url.startsWith('/carreras/')) {
  let body = '';
  req.on('data', chunk => body += chunk.toString());
  req.on('end', () => {
    const data = JSON.parse(body || '{}');
    const id = req.url.split('/')[2];
    
    if (!data.titulo) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Falta el título' }));
    }

    carreraDAO.actualizarCarrera(
      { id: id, titulo: data.titulo }, 
      (err, result) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: err.message }));
        } else {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, affectedRows: result.affectedRows }));
        }
      }
    );
  });
  return;
}

  //ALUMNOS
  if (req.method === 'POST' && req.url === '/alumnos') {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => {
      const data = JSON.parse(body || '{}');
      if (!data.nombre) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Falta el nombre' }));
      }

      alumnoDAO.insertarAlumno({ nombre: data.nombre }, (err, result) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: err.message }));
        } else {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ id: result.insertId }));
        }
      });
    });
    return;
  }

  //Listar alumnos
  if (req.method === 'GET' && req.url === '/alumnos') {
    alumnoDAO.obtenerTodos((err, resultados) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error al obtener alumnos' }));
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(resultados));
      }
    });
    return;
  }

  // Eliminar alumno 
  if (req.method === 'DELETE' && req.url.startsWith('/alumnos/')) {
    const id = req.url.split('/')[2];
    alumnoDAO.eliminarAlumno(id, (err) => {
      if (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error al eliminar alumno' }));
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true }));
      }
    });
    return;
  }

  // Actualizar alumno
  if (req.method === 'PUT' && req.url.startsWith('/alumnos/')) {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => {
      const data = JSON.parse(body || '{}');
      const id = req.url.split('/')[2];
      
      if (!data.nombre) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Falta el nombre' }));
      }

      alumnoDAO.actualizarAlumno(
        { id: id, nombre: data.nombre, carrera: data.carrera || null }, 
        (err, result) => {
          if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
          } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, affectedRows: result.affectedRows }));
          }
        }
      );
    });
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'No encontrado' }));
});

server.listen(3000, () => console.log('Servidor en http://localhost:3000'));
