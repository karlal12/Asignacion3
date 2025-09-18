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

    const endpoint = entidadActual === 'alumnos'
      ? 'http://localhost:3000/alumnos'
      : 'http://localhost:3000/carreras';

    const bodyData = entidadActual === 'alumnos'
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
  const url = entidadActual === 'carreras'
    ? 'http://localhost:3000/carreras'
    : 'http://localhost:3000/alumnos';

  fetch(url)
    .then(res => res.json())
    .then(data => {
      contenido.innerHTML = '';

      const form = document.createElement('form');
      const select = document.createElement('select');

      data.forEach(item => {
        const option = document.createElement('option');
        option.value = item.id;
        option.textContent = entidadActual === 'carreras'
          ? `${item.id} - ${item.titulo}`
          : `${item.id} - ${item.nombre}`;
        select.appendChild(option);
      });

      const btn = document.createElement('button');
      btn.textContent = 'Borrar';

      form.appendChild(select);
      form.appendChild(btn);

      form.addEventListener('submit', e => {
        e.preventDefault();
        const id = select.value;

        fetch(`${url}/${id}`, { method: 'DELETE' })
          .then(res => res.json())
          .then(() => {
            alert('Eliminado con éxito');
            mostrarListado(); 
          })
          .catch(err => {
            console.error(err);
            alert('Error al borrar');
          });
      });

      contenido.appendChild(form);
    })
    .catch(err => {
      console.error(err);
      alert('Error al cargar elementos para borrar');
    });
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

  } else if (entidadActual === 'alumnos') {
    fetch('http://localhost:3000/carreras')
      .then(res => res.json())
      .then(carreras => {
        const mapaCarreras = {};
        carreras.forEach(c => mapaCarreras[c.id] = c.titulo);
        
        return fetch('http://localhost:3000/alumnos')
          .then(res => res.json())
          .then(alumnos => ({ alumnos, mapaCarreras }));
      })
      .then(({ alumnos, mapaCarreras }) => {
        contenido.innerHTML = '';
        const lista = document.createElement('ul');
        alumnos.forEach(alumno => {
          const tituloCarrera = mapaCarreras[alumno.carrera] || 'Sin carrera';
          const li = document.createElement('li');
          li.textContent = `${alumno.id} - ${alumno.nombre} - ${tituloCarrera}`;
          lista.appendChild(li);
        });
        contenido.appendChild(lista);
      })
      .catch(err => {
        console.error(err);
        alert('Error al obtener el listado de alumnos');
      });
  }
}



function mostrarFormularioAsignar() {
  const urlAlumnos = 'http://localhost:3000/alumnos';
  const urlCarreras = 'http://localhost:3000/carreras';

  Promise.all([
    fetch(urlAlumnos).then(res => res.json()),
    fetch(urlCarreras).then(res => res.json())
  ])
  .then(([alumnos, carreras]) => {
    contenido.innerHTML = '';

    const form = document.createElement('form');

    const selectAlumnos = document.createElement('select');
    selectAlumnos.required = true;
    selectAlumnos.innerHTML = '<option value="">Seleccione un alumno</option>';
    alumnos.forEach(alumno => {
      const option = document.createElement('option');
      option.value = alumno.id;
      option.textContent = `${alumno.id} - ${alumno.nombre}`;
      selectAlumnos.appendChild(option);
    });

    const selectCarreras = document.createElement('select');
    selectCarreras.required = true;
    selectCarreras.innerHTML = '<option value="">Seleccione una carrera</option>';
    carreras.forEach(carrera => {
      const option = document.createElement('option');
      option.value = carrera.id;
      option.textContent = `${carrera.id} - ${carrera.titulo}`;
      selectCarreras.appendChild(option);
    });

    const btn = document.createElement('button');
    btn.textContent = 'Asignar';

    form.appendChild(selectAlumnos);
    form.appendChild(selectCarreras);
    form.appendChild(btn);

    form.addEventListener('submit', e => {
      e.preventDefault();

      const idAlumno = selectAlumnos.value;
      const idCarrera = selectCarreras.value;

      if (!idAlumno || !idCarrera) {
        alert('Debe seleccionar un alumno y una carrera');
        return;
      }

      fetch('http://localhost:3000/asignaciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          alumnoId: idAlumno,
          carreraId: idCarrera
        })
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert('Alumno asignado a carrera con éxito');
          form.reset();
        } else {
          alert('Error al asignar: ' + (data.error || 'Error desconocido'));
        }
      })
      .catch(err => {
        console.error(err);
        alert('Error al conectar con el servidor');
      });
    });

    contenido.appendChild(form);
  })
  .catch(err => {
    console.error(err);
    alert('Error al cargar alumnos o carreras');
  });
}


function mostrarFormularioCambiar() {
  const url = entidadActual === 'carreras' 
    ? 'http://localhost:3000/carreras' 
    : 'http://localhost:3000/alumnos';

  fetch(url)
    .then(res => res.json())
    .then(data => {
      contenido.innerHTML = '';

      const form = document.createElement('form');
      const select = document.createElement('select');
      const input = document.createElement('input');
      const btn = document.createElement('button');

      // Configurar el select
      select.innerHTML = '<option value="">Seleccione uno</option>';
      data.forEach(item => {
        const option = document.createElement('option');
        option.value = item.id;
        option.textContent = entidadActual === 'carreras' 
          ? `${item.id} - ${item.titulo}` 
          : `${item.id} - ${item.nombre}`;
        option.dataset.nombre = item.nombre || item.titulo;
        select.appendChild(option);
      });

      // Configurar el input
      input.type = 'text';
      input.placeholder = `Nuevo nombre para ${entidadActual.slice(0, -1)}`;
      input.required = true;

      // Configurar el botón
      btn.textContent = 'Actualizar';

      // Cuando se selecciona un elemento, mostrar su nombre actual
      select.addEventListener('change', () => {
        if (select.value) {
          input.value = select.options[select.selectedIndex].dataset.nombre;
          input.focus();
        } else {
          input.value = '';
        }
      });

      form.appendChild(select);
      form.appendChild(input);
      form.appendChild(btn);

      form.addEventListener('submit', e => {
        e.preventDefault();
        const id = select.value;
        const nuevoNombre = input.value;

        if (!id) {
          alert('Por favor seleccione un elemento');
          return;
        }

        // Determinar el endpoint y body según la entidad
        const endpoint = `${url}/${id}`;
        const bodyData = entidadActual === 'carreras' 
          ? { titulo: nuevoNombre } 
          : { nombre: nuevoNombre };

        fetch(endpoint, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bodyData)
        })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            alert('Actualizado con éxito');
            mostrarFormularioCambiar(); // Recargar el formulario
          } else {
            alert('Error al actualizar: ' + (data.error || 'Error desconocido'));
          }
        })
        .catch(err => {
          console.error(err);
          alert('Error al conectar con el servidor');
        });
      });

      contenido.appendChild(form);
    })
    .catch(err => {
      console.error(err);
      alert('Error al cargar elementos para actualizar');
    });
}
