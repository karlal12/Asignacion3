const titulo = document.getElementById('titulo');
const accionesBotones = document.getElementById('accionesBotones');
const contenido = document.getElementById('contenido');
let entidadActual = null;

// Al hacer clic en una entidad (Alumnos / Carreras / Asignar)
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

// Al hacer clic en acción (Agregar / Borrar / Cambiar / Ver)
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

// ---------- FORMULARIOS ----------

function mostrarFormularioAgregar() {
  const form = document.createElement('form');
  form.innerHTML = `
    <input type="text" placeholder="Nombre de la carrera" required>
    <button>Agregar</button>
  `;
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = form.querySelector('input').value;

    try {
      const resp = await fetch('http://localhost:3000/carreras', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo: nombre })
      });

      const data = await resp.json();
      if (resp.ok) {
        alert('Carrera agregada con ID ' + data.id);
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
  const lista = document.createElement('ul');
  lista.innerHTML = `
    <li>1</li>
    <li>2</li>
    <li>3</li>
  `;
  contenido.appendChild(lista);
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
