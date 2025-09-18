const titulo = document.getElementById('titulo');
const accionesBotones = document.getElementById('accionesBotones');
const contenido = document.getElementById('contenido');
let entidadActual = null;

document.querySelectorAll('.menu button').forEach(btn => {
  btn.addEventListener('click', () => {
    entidadActual = btn.dataset.entidad;
    titulo.textContent = entidadActual === 'asignar'
      ? 'Asignar alumno a carrera'
      : `Gestionar ${entidadActual}`;
    
    accionesBotones.style.display = entidadActual === 'asignar' ? 'none' : 'flex';
    contenido.innerHTML = '';

    if (entidadActual === 'asignar') {
      mostrarFormularioAsignar();
    }
  });
});


document.querySelectorAll('#accionesBotones button').forEach(btn => {
  btn.addEventListener('click', () => {
    const accion = btn.dataset.accion;
    contenido.innerHTML = '';

    if (accion === 'agregar') mostrarFormularioAgregar();
    if (accion === 'borrar') mostrarFormularioBorrar();
    if (accion === 'cambiar') mostrarFormularioCambiar();
    if (accion === 'ver') mostrarListado();
  });
});

function mostrarFormularioAgregar() {
  const form = document.createElement('form');

  const placeholder = entidadActual === 'alumnos'
    ? 'Nombre del alumno'
    : 'Nombre de la carrera';

  form.innerHTML = `
    <input type="text" placeholder="${placeholder}" required>
    <button>Agregar</button>
  `;
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = form.querySelector('input').value;

    //Entidad actual
    const endpoint = entidadActual === 'alumnos'
      ? 'http://localhost:3000/alumnos' 
      : 'http://localhost:3000/carreras';

    const bodyData = entidadActual ===  'alumnos'
      ? { nombre: nombre } 
      : { titulo: nombre };

    try {
      const resp = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData)
      });

      const data = await resp.json();
      if (resp.ok) {
        alert(`${entidadActual.slice(0, -1)} agregad${entidadActual === 'alumnos' ? 
          'o' : 'a'} con ID ${data.id}`);
        form.reset();
      } else {
        alert('Error: ' + data.error);
      }
    } catch (err) {
      alert('Error al conectar con el servidor');
      console.error(err);
    }
  });

  contenido.appendChild(form);
}

function mostrarFormularioBorrar() {
  const form = document.createElement('form');
  form.innerHTML = `
    <select>
      <option>Opción 1</option>
      <option>Opción 2</option>
    </select>
    <button>Borrar</button>
  `;
  contenido.appendChild(form);
}

function mostrarFormularioCambiar() {
  const form = document.createElement('form');
  form.innerHTML = `
    <select>
      <option>Opción 1</option>
      <option>Opción 2</option>
    </select>
    <input type="text" placeholder="Nuevo nombre">
    <button>Cambiar</button>
  `;
  contenido.appendChild(form);
}

function mostrarListado() {
  if (entidadActual === 'carreras') {
    fetch('http://localhost:3000/carreras')
      .then(res => res.json())
      .then(data => {
        contenido.innerHTML = '';
        const lista = document.createElement('ul');
        data.forEach(carrera => {
          const li = document.createElement('li');
          li.textContent = `${carrera.id} - ${carrera.titulo}`;
          lista.appendChild(li);
        });
        contenido.appendChild(lista);
      })
      .catch(err => {
        console.error(err);
        alert('Error al obtener el listado de carreras');
      });
  } else {
    contenido.innerHTML = '<p>Listado no disponible todavía</p>';
  }
}


function mostrarFormularioAsignar() {
  const form = document.createElement('form');
  form.innerHTML = `
    <select>
      <option>Alumno 1</option>
      <option>Alumno 2</option>
    </select>
    <select>
      <option>Carrera 1</option>
      <option>Carrera 2</option>
    </select>
    <button>Asignar</button>
  `;
  contenido.appendChild(form);
}
