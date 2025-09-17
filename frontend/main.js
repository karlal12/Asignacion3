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
  form.innerHTML = `
    <input type="text" placeholder="Nombre">
    <button>Agregar</button>
  `;
  contenido.appendChild(form);
}

function mostrarFormularioBorrar() {
  const form = document.createElement('form');
  form.innerHTML = `
    <select>
      <option>Opcion 1</option>
      <option>Opcion 2</option>
    </select>
    <button>Borrar</button>
  `;
  contenido.appendChild(form);
}

function mostrarFormularioCambiar() {
  const form = document.createElement('form');
  form.innerHTML = `
    <select>
      <option>Opcion 1</option>
      <option>Opcion 2</option>
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
