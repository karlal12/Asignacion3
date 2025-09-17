const http = require('http');
const carreraDAO = require('./dataAccess/carreraDAO');
const alumnoDAO = require('./dataAccess/alumnoDAO')

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204); return res.end();
  }

  if (req.method === 'POST' && req.url === '/carreras') {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => {
      const data = JSON.parse(body || '{}');
      if (!data.titulo) {
        res.writeHead(400, {'Content-Type':'application/json'});
        return res.end(JSON.stringify({ error: 'Falta el título' }));
      }

      carreraDAO.insertarCarrera({ titulo: data.titulo }, (err, result) => {
        if (err) {
          res.writeHead(500, {'Content-Type':'application/json'});
          res.end(JSON.stringify({ error: err.message }));
        } else {
          res.writeHead(200, {'Content-Type':'application/json'});
          res.end(JSON.stringify({ id: result.insertId }));
        }
      });
    });
    return;
  }

  if (req.method === 'POST' && req.url === '/alumnos') {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => {
      const data = JSON.parse(body || '{}');
      if (!data.nombre) {
        res.writeHead(400, {'Content-Type':'application/json'});
        return res.end(JSON.stringify({ error: 'Falta el nombre' }));
      }

      alumnoDAO.insertarAlumno({ nombre: data.nombre }, (err, result) => {
        if (err) {
          res.writeHead(500, {'Content-Type':'application/json'});
          res.end(JSON.stringify({ error: err.message }));
        } else {
          res.writeHead(200, {'Content-Type':'application/json'});
          res.end(JSON.stringify({ id: result.insertId }));
        }
      });
    });
    return;
  }

  res.writeHead(404, {'Content-Type':'application/json'});
  res.end(JSON.stringify({ error: 'No encontrado' }));
});

server.listen(3000, () => console.log('Servidor en http://localhost:3000'));
