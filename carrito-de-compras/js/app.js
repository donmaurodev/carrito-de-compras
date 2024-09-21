// Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();

function cargarEventListeners(){
  // Cuando agregas un curso presionando "Agregar al Carrito"
  listaCursos.addEventListener('click', agregarCurso);

  // Elimina cursos del carrito
  carrito.addEventListener('click', eliminarCurso);

  // Vaciar el carrito
  vaciarCarritoBtn.addEventListener('click', () => {
    articulosCarrito = []; // Resetear arreglo
    limpiarHTML(); // Eliminar HTML
  });
}

// Funciones
function agregarCurso(e){
  e.preventDefault();

  if(e.target.classList.contains('agregar-carrito')){
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCurso(cursoSeleccionado);
  }
}

// Elimina un curso del carrito
function eliminarCurso(e) {
  // e.preventDefault();
  if (e.target.classList.contains('borrar-curso')) {
    const cursoId = e.target.getAttribute('data-id');

    // Encontrar curso del carrito
    const curso = articulosCarrito.find( curso => curso.id === cursoId );

    if (curso.cantidad > 1) {
      // Si la cantidad es mayor a 1, disminuye
      curso.cantidad--;
    }else {
      // Si solo hay uno, lo elimina
      articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);
    }

    // Eliminar del arreglo articulosCarrito por el data-id
    // articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);

    carritoHTML(); // Iterar sobre el carrito y mostrar su HTML
  }
}

// Lee contenido del html al que dimos click y extrae info del curso
function leerDatosCurso(curso) {
  // Crear objeto con el contenido del curso actual
  const infoCurso = {
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('span').textContent,
    id: curso.querySelector('a').getAttribute('data-id'),
    cantidad: 1,
  }

  // Revisa si un elemento ya existe en el carrito
  const existe = articulosCarrito.some( curso => curso.id === infoCurso.id );
  
  if (existe) {
    // Actualizamos la cantidad creando un nuevo arreglo
    const cursos = articulosCarrito.map( curso => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso; // retorna el objeto actualizado      
      } else {
        return curso; // retorna los objetos no duplicados
      }
    } );
    articulosCarrito = [...cursos]; // Se reemplaza el arreglo original por el nuevo
  } else {
    // Agrega elementos al arreglo del carrito
    articulosCarrito = [...articulosCarrito, infoCurso];
  }
  
  console.log(articulosCarrito);
  carritoHTML();
  
}

// Muestra carrito de compras en el HTML
function carritoHTML() {

  // Limpiar HTML
  limpiarHTML();

  // Recorre el carrito y genera el HTML
  articulosCarrito.forEach( (curso) => {
    const {imagen, titulo, precio, cantidad, id} = curso; // Destructuring
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <img src="${imagen}" width="100">
      </td>
      <td> ${titulo} </td>
      <td> ${precio} </td>
      <td> ${cantidad} </td>
      <td>
        <a href="#" class="borrar-curso" data-id="${id}"> X </a>
      </td>
    `
    // Agrega el HMTL del carrito en el tbody

    contenedorCarrito.appendChild(row);
  });
}

// Eliminar cursos del tbody
function limpiarHTML() {

  while(contenedorCarrito.firstChild){
    contenedorCarrito.removeChild(contenedorCarrito.firstChild)
  }

  // Forma lenta
  // contenedorCarrito.innerHTML = '';
}