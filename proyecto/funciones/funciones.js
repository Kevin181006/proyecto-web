const productos = [
  {
    id: 1,
    nombre: 'Aire acondicionado 9000 BTU',
    categoria: 'Refrigeradores',
    precio: 450.00,
    imagen: 'imagenes/aire acondicionado.png',
    rating: 4.5
  },
  {
    id: 2,
    nombre: 'Lavadora Samsung 16 kg',
    categoria: 'Lavadoras',
    precio: 520.00,
    imagen: 'imagenes/lavadora.png',
    rating: 4.7
  },
  {
    id: 3,
    nombre: 'Microondas digital 0.9 pies',
    categoria: 'Microondas',
    precio: 180.00,
    imagen: 'imagenes/microondas digital.png',
    rating: 4.3
  },
  {
    id: 4,
    nombre: 'Refrigerador inverter 18 pies',
    categoria: 'Refrigeradores',
    precio: 950.00,
    imagen: 'imagenes/Refrigerador inverter.png',
    rating: 4.9
  },
  {
    id: 5,
    nombre: 'Cafetera de goteo 12 tazas',
    categoria: 'Pequeños',
    precio: 120.00,
    imagen: 'imagenes/cafetera de goteo.png',
    rating: 4.8
  },
  {
    id: 6,
    nombre: 'Lavavajillas compacto 8 servicios',
    categoria: 'Lavavajillas',
    precio: 320.00,
    imagen: 'imagenes/lavavajillas compacto.png',
    rating: 4.6
  },

  {
    id: 7,
    nombre: 'Secadora eléctrica 18 kg',
    categoria: 'Lavadoras',
    precio: 480.00,
    imagen: 'imagenes/secadora electrica.png',
    rating: 4.4
  },
  {
    id: 8,
    nombre: 'Horno eléctrico 60L',
    categoria: 'Pequeños',
    precio: 210.00,
    imagen: 'imagenes/horno electrico.png',
    rating: 4.2
  },
  {
    id: 9,
    nombre: 'Licuadora profesional 1.5L',
    categoria: 'Pequeños',
    precio: 95.00,
    imagen: 'imagenes/Licuadora profesional.png',
    rating: 4.1
  },
  {
    id: 10,
    nombre: 'Refrigerador side-by-side 24 pies',
    categoria: 'Refrigeradores',
    precio: 1350.00,
    imagen: 'imagenes/refrigerador sidebyside.png',
    rating: 4.9
  },
  {
    id: 11,
    nombre: 'Campana extractora 90cm',
    categoria: 'Pequeños',
    precio: 260.00,
    imagen: 'imagenes/cmapana estractora.png',
    rating: 4.3
  },
  {
    id: 12,
    nombre: 'Cocina a gas 5 hornillas',
    categoria: 'Pequeños',
    precio: 540.00,
    imagen: 'imagenes/cocina a gas 5 hornillas.png',
    rating: 4.7
  },
  {
    id: 13,
    nombre: 'Heladera vertical 300L',
    categoria: 'Refrigeradores',
    precio: 680.00,
    imagen: 'imagenes/heladera vertical 300.jpg',
    rating: 4.4
  },
  {
    id: 14,
    nombre: 'Horno empotrable eléctrico',
    categoria: 'Pequeños',
    precio: 720.00,
    imagen: 'imagenes/horno empotrable electrico.png',
    rating: 4.8
  },
  {
    id: 15,
    nombre: 'Lavadora carga superior 12 kg',
    categoria: 'Lavadoras',
    precio: 390.00,
    imagen: 'imagenes/lavadora carga superior.jpg',
    rating: 4.0
  },
  {
    id: 16,
    nombre: 'Lavavajillas integrado 12 servicios',
    categoria: 'Lavavajillas',
    precio: 610.00,
    imagen: 'imagenes/lavavajillas integrado 12 servicios.jpg',
    rating: 4.5
  },
  {
    id: 17,
    nombre: 'Robot aspirador inteligente',
    categoria: 'Pequeños',
    precio: 450.00,
    imagen: 'imagenes/robot aspirador inteligente.png',
    rating: 4.6
  },
  {
    id: 18,
    nombre: 'Microondas grill 1.2 pies',
    categoria: 'Microondas',
    precio: 230.00,
    imagen: 'imagenes/microondas grill.png',
    rating: 4.5
  }
];




const LIMITE_POR_PAGINA = 6;
let paginaActual = 1;
let categoriaActual = 'todos';
let textoBusqueda = '';
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function guardarProductoSeleccionado(producto) {
    localStorage.setItem('productoSeleccionado', JSON.stringify(producto));
}

function obtenerProductoSeleccionado() {
    const dato = localStorage.getItem('productoSeleccionado');
    if (!dato) return null;
    try {
        return JSON.parse(dato);
    } catch {
        return null;
    }
}

function agregarAlCarrito(idProducto) {
    const existente = carrito.find(item => item.id === idProducto);
    if (existente) {
        existente.cantidad += 1;
    } else {
        const producto = productos.find(p => p.id === idProducto);
        if (!producto) return;
        carrito.push({ id: producto.id, nombre: producto.nombre, precio: producto.precio, cantidad: 1 });
    }
    guardarCarrito();
    actualizarCarritoHeader();
}

function eliminarDelCarrito(idProducto) {
    carrito = carrito.filter(item => item.id !== idProducto);
    guardarCarrito();
    actualizarCarritoHeader();
    renderizarCarritoPagina();
}

function cambiarCantidad(idProducto, nuevaCantidad) {
    const item = carrito.find(i => i.id === idProducto);
    if (!item) return;
    const cantidadNumero = Number(nuevaCantidad);
    if (Number.isNaN(cantidadNumero) || cantidadNumero <= 0) {
        eliminarDelCarrito(idProducto);
        return;
    }
    item.cantidad = cantidadNumero;
    guardarCarrito();
    actualizarCarritoHeader();
    renderizarCarritoPagina();
}

function obtenerProductosFiltrados() {
  let lista = productos;

  if (categoriaActual !== 'todos') {
    lista = lista.filter(p => p.categoria === categoriaActual);
  }

  if (textoBusqueda.trim() !== '') {
    const termino = textoBusqueda.toLowerCase();
    lista = lista.filter(p =>
      p.nombre.toLowerCase().includes(termino)
    );
  }

  return lista;
}


function obtenerTotalPaginas() {
    const lista = obtenerProductosFiltrados();
    return Math.max(1, Math.ceil(lista.length / LIMITE_POR_PAGINA));
}

function renderizarProductos() {
    const contenedor = document.getElementById('lista-productos');
    if (!contenedor) return;

    const lista = obtenerProductosFiltrados();
    const totalPaginas = obtenerTotalPaginas();

    if (paginaActual > totalPaginas) {
        paginaActual = totalPaginas;
    }

    const inicio = (paginaActual - 1) * LIMITE_POR_PAGINA;
    const fin = inicio + LIMITE_POR_PAGINA;
    const paginaProductos = lista.slice(inicio, fin);

    contenedor.innerHTML = '';

    paginaProductos.forEach(producto => {
        const articulo = document.createElement('article');
        articulo.className = 'tarjeta-producto';

        const etiqueta = document.createElement('span');
        etiqueta.className = 'etiqueta-categoria';
        etiqueta.textContent = producto.categoria;

        const figura = document.createElement('figure');
        figura.className = 'figura-producto';

        const enlaceDetalle = document.createElement('a');
        enlaceDetalle.href = 'estructuraDelProducto.html';

        const imagen = document.createElement('img');
        imagen.src = producto.imagen;
        imagen.alt = producto.nombre;

        enlaceDetalle.addEventListener('click', () => {
            guardarProductoSeleccionado(producto);
        });

        enlaceDetalle.appendChild(imagen);
        figura.appendChild(enlaceDetalle);

        const info = document.createElement('div');
        info.className = 'info-producto';

        const titulo = document.createElement('h3');
        const enlaceTitulo = document.createElement('a');
        enlaceTitulo.href = 'estructuraDelProducto.html';
        enlaceTitulo.textContent = producto.nombre;
        enlaceTitulo.addEventListener('click', () => {
            guardarProductoSeleccionado(producto);
        });
        titulo.appendChild(enlaceTitulo);

        const calificacion = document.createElement('div');
        calificacion.className = 'calificacion';
        calificacion.textContent = '(' + producto.rating.toFixed(1) + ')';

        const precio = document.createElement('p');
        precio.className = 'precio';
        precio.innerHTML = '<strong>$' + producto.precio.toFixed(2) + '</strong>';

        const boton = document.createElement('button');
        boton.className = 'boton-agregar';
        boton.textContent = 'Agregar al carrito';
        boton.addEventListener('click', () => agregarAlCarrito(producto.id));

        info.appendChild(titulo);
        info.appendChild(calificacion);
        info.appendChild(precio);
        info.appendChild(boton);

        articulo.appendChild(etiqueta);
        articulo.appendChild(figura);
        articulo.appendChild(info);

        contenedor.appendChild(articulo);
    });

    actualizarPaginador();
}

function actualizarPaginador() {
    const paginador = document.querySelector('.paginador');
    if (!paginador) return;

    const totalPaginas = obtenerTotalPaginas();

    paginador.innerHTML = '';

    const btnAnterior = document.createElement('button');
    btnAnterior.className = 'boton-pagina';
    btnAnterior.textContent = 'Anterior';
    btnAnterior.disabled = paginaActual === 1;
    btnAnterior.addEventListener('click', () => {
        if (paginaActual > 1) {
            paginaActual--;
            renderizarProductos();
        }
    });
    paginador.appendChild(btnAnterior);

    for (let i = 1; i <= totalPaginas; i++) {
        const btn = document.createElement('button');
        btn.className = 'boton-pagina' + (i === paginaActual ? ' boton-pagina-activa' : '');
        btn.textContent = i;
        btn.addEventListener('click', () => {
            paginaActual = i;
            renderizarProductos();
        });
        paginador.appendChild(btn);
    }

    const btnSiguiente = document.createElement('button');
    btnSiguiente.className = 'boton-pagina';
    btnSiguiente.textContent = 'Siguiente';
    btnSiguiente.disabled = paginaActual === totalPaginas;
    btnSiguiente.addEventListener('click', () => {
        if (paginaActual < totalPaginas) {
            paginaActual++;
            renderizarProductos();
        }
    });
    paginador.appendChild(btnSiguiente);
}

function iniciarFiltros() {
    const enlaces = document.querySelectorAll('.navegacion-filtros a');
    if (!enlaces.length) return;

    enlaces.forEach(enlace => {
        enlace.addEventListener('click', evento => {
            evento.preventDefault();
            const categoria = enlace.dataset.categoria;
            categoriaActual = categoria || 'todos';
            paginaActual = 1;
            renderizarProductos();
        });
    });
}
function iniciarBuscador() {
  const input = document.getElementById('buscador-productos');
  if (!input) return;

  input.addEventListener('input', () => {
    textoBusqueda = input.value;
    paginaActual = 1;
    renderizarProductos();
  });
}


function actualizarCarritoHeader() {
    let total = 0;
    carrito.forEach(item => {
        total += item.cantidad;
    });

    let indicador = document.getElementById('contador-carrito');
    const menu = document.getElementById('menu-principal');
    if (!menu) return;

    const enlaceCarrito = Array.from(menu.querySelectorAll('a')).find(a => a.getAttribute('href') === 'carrito.html');
    if (!enlaceCarrito) return;

    if (!indicador) {
        indicador = document.createElement('span');
        indicador.id = 'contador-carrito';
        indicador.style.marginLeft = '6px';
        indicador.style.background = '#fbbf24';
        indicador.style.color = '#111827';
        indicador.style.borderRadius = '999px';
        indicador.style.padding = '2px 7px';
        indicador.style.fontSize = '0.75rem';
        enlaceCarrito.appendChild(indicador);
    }

    indicador.textContent = total;
}

function renderizarCarritoPagina() {
    const cuerpo = document.getElementById('cuerpo-carrito');
    const totalSpan = document.getElementById('total-carrito');
    if (!cuerpo || !totalSpan) return;

    cuerpo.innerHTML = '';
    let total = 0;

    carrito.forEach(item => {
        const fila = document.createElement('tr');

        const tdNombre = document.createElement('td');
        tdNombre.textContent = item.nombre;

        const tdPrecio = document.createElement('td');
        tdPrecio.textContent = '$' + item.precio.toFixed(2);

        const tdCantidad = document.createElement('td');
        const inputCantidad = document.createElement('input');
        inputCantidad.type = 'number';
        inputCantidad.min = '1';
        inputCantidad.value = item.cantidad;
        inputCantidad.style.width = '60px';
        inputCantidad.addEventListener('change', () => cambiarCantidad(item.id, inputCantidad.value));
        tdCantidad.appendChild(inputCantidad);

        const subtotal = item.precio * item.cantidad;
        total += subtotal;

        const tdTotal = document.createElement('td');
        tdTotal.textContent = '$' + subtotal.toFixed(2);

        const tdAcciones = document.createElement('td');
        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.style.padding = '4px 10px';
        btnEliminar.style.borderRadius = '999px';
        btnEliminar.style.border = '1px solid #ef4444';
        btnEliminar.style.background = '#fee2e2';
        btnEliminar.style.color = '#991b1b';
        btnEliminar.style.cursor = 'pointer';
        btnEliminar.addEventListener('click', () => eliminarDelCarrito(item.id));
        tdAcciones.appendChild(btnEliminar);

        fila.appendChild(tdNombre);
        fila.appendChild(tdPrecio);
        fila.appendChild(tdCantidad);
        fila.appendChild(tdTotal);
        fila.appendChild(tdAcciones);

        cuerpo.appendChild(fila);
    });

    totalSpan.innerHTML = '<strong>$' + total.toFixed(2) + '</strong>';
}

function iniciarMenuHamburguesa() {
    const boton = document.querySelector('.boton-menu');
    const menu = document.getElementById('menu-principal');
    if (!boton || !menu) return;

    boton.addEventListener('click', () => {
        menu.classList.toggle('activo');
    });
}

function iniciarEstrellasDetalle() {
    const contenedor = document.getElementById('caja-estrellas');
    const texto = document.getElementById('texto-valoracion');
    if (!contenedor || !texto) return;

    for (let i = 1; i <= 5; i++) {
        const estrella = document.createElement('span');
        estrella.textContent = '★';
        estrella.classList.add('estrella');
        estrella.dataset.valor = i;

        estrella.addEventListener('click', () => {
            actualizarSeleccionEstrellas(i);
            texto.textContent = 'Tu voto: ' + i;
        });

        contenedor.appendChild(estrella);
    }
}

function actualizarSeleccionEstrellas(valor) {
    const estrellas = document.querySelectorAll('.estrella');
    estrellas.forEach(e => {
        const v = Number(e.dataset.valor);
        if (v <= valor) {
            e.classList.add('seleccionada');
        } else {
            e.classList.remove('seleccionada');
        }
    });
}

function rellenarDetalleProducto() {
    const datos = obtenerProductoSeleccionado();
    if (!datos) return;

    const img = document.getElementById('detalle-imagen');
    const nombre = document.getElementById('detalle-nombre');
    const sku = document.getElementById('detalle-sku');
    const precio = document.getElementById('detalle-precio');
    const descripcion = document.getElementById('detalle-descripcion');
    const botonCarrito = document.getElementById('boton-detalle-carrito');

    if (img) {
        img.src = datos.imagen;
        img.alt = datos.nombre;
    }
    if (nombre) nombre.textContent = datos.nombre;
    if (sku) sku.textContent = 'SKU: ' + (datos.id || '');
    if (precio) precio.innerHTML = '<strong>$' + datos.precio.toFixed(2) + '</strong>';
    if (descripcion && datos.descripcion) {
        descripcion.textContent = datos.descripcion;
    }

    if (botonCarrito) {
        botonCarrito.onclick = () => agregarAlCarrito(datos.id);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    iniciarMenuHamburguesa();
    actualizarCarritoHeader();
    iniciarFiltros();
    iniciarBuscador();
    renderizarProductos();
    renderizarCarritoPagina();
    iniciarEstrellasDetalle();
    rellenarDetalleProducto();
});
