// --- Clases ---
class Pizza {
  constructor(id, nombre, ingredientes, precio) {
    this.id = id;
    this.nombre = nombre;
    this.ingredientes = ingredientes;
    this.precio = precio;
  }
}
class Bebida {
  constructor(id, nombre, precio) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
  }
}

// --- Datos ---
const menuPizzas = [
  new Pizza(1, "Margarita", ["tomate cherry", "mozzarella", "albahaca"], 12000),
  new Pizza(2, "Pepperoni", ["tomate", "mozzarella", "pepperoni"], 11000),
  new Pizza(3, "Napolitana", ["mozzarella", "tomate", "orégano", "aceitunas"], 11500),
  new Pizza(4, "Pollo BBQ", ["mozzarella", "pollo", "salsa BBQ", "cebolla"], 13000),
  new Pizza(5, "Hawaiana", ["mozzarella", "jamón", "piña"], 12480),
  new Pizza(6, "Veggie", ["tomate", "mozzarella", "pimiento", "cebolla", "aceitunas"], 11500),
  new Pizza(7, "Garlic", ["mozzarella", "ajo", "perejil"], 11800),
  new Pizza(8, "Todas las carnes", ["mozzarella", "jamón", "pollo", "chorizo", "pimiento"], 14500)
];
const menuBebidas = [
  new Bebida(1, "Coca-Cola 500 ml", 2000),
  new Bebida(2, "Coca-Cola Zero 500 ml", 2000),
  new Bebida(3, "Sprite 500 ml", 2000),
  new Bebida(4, "Fanta 500 ml", 2000),
  new Bebida(5, "Agua Mineral 500 ml", 1700),
  new Bebida(6, "Coca-Cola 1.5 lt", 3500),
  new Bebida(7, "Coca-Cola Zero 1.5 lt", 3500),
  new Bebida(8, "Sprite 1.5 lt", 3500),
  new Bebida(9, "Fanta 1.5 lt", 3500),
  new Bebida(10, "Agua Mineral 1.5 lt", 2500)
];


//---- Guardar productos en el carrito (LocalStorage) -----

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

//----- Menú principal -------

function menuPrincipal () {
    const contenedor = document.getElementById('contenedor');
    contenedor.innerHTML = `
    <h1> 🍕 Cerezo's Pizzas 🍕</h1>
    <h2> Bienvenido a la mejor pizzería de Chile </h2>
    <button class="button" id="btnMenuPizza">Menú Pizzas</button>
    <button class="button" id="btnMenuBebidas">Menú Bebidas</button>
    <button class="button" id="btnVerCarrito">Ver Carrito</button>
    `; //Esta es la entrada principal a la página
    document.getElementById('btnMenuPizza').onclick = verMenuPizzas; // Cada botón esta asociado a una función que está más abajo, para visualizar los distintos menú y el carrito.
    document.getElementById('btnMenuBebidas').onclick = verMenuBebidas;
    document.getElementById('btnVerCarrito').onclick = verCarrito;
}

//------ Menú de Pizzas -------

function verMenuPizzas(){
    const contenedor = document.getElementById('contenedor');
    let modificarHTML = `
    <h1>Cerezo's Pizza </h1>
    <h2>Menú de Pizzas </h2> <ul class='menu-list'>`;
    menuPizzas.forEach(pizza => {
    modificarHTML += `<li><strong>${pizza.nombre}</strong> - $${pizza.precio}<br>
      <span>Ingredientes: ${pizza.ingredientes.join(', ')}</span><br>
      <button class='button' onclick='agregarAlCarrito(${pizza.id}, "pizza")'>Agregar al carrito</button>
      </li>`;
    });
    modificarHTML += `</ul><button class='button' id='volverMenu'>Volver</button>`;
    contenedor.innerHTML= modificarHTML;
    document.getElementById('volverMenu').onclick = menuPrincipal;
}

//------ Menú para bebidas ----------

function verMenuBebidas(){
    const contenedor = document.getElementById('contenedor');
    let modificaContenedor = `
    <h1> Cerezo's Pizza </h1>
    <h2> Menú de Bebidas </h2><ul class='menu-list'>`;
    menuBebidas.forEach(bebida => {
        modificaContenedor += `
        <li><strong>${bebida.nombre}</strong> - $${bebida.precio}<br>
        <button class='button' onclick='agregarAlCarrito(${bebida.id}, "bebida")'>Agregar al carrito</button>
        </li>`;
    });
    modificaContenedor += `</ul><button class='button' id='volverMenu'>Volver</button>`;
    contenedor.innerHTML = modificaContenedor;
    document.getElementById('volverMenu').onclick = menuPrincipal;
}

//----- Agregar al carrito -----

window.agregarAlCarrito = function (id, tipo){
  let producto;
  if (tipo === "pizza") {
    producto = menuPizzas.find(p => p.id === id);
  } else {
    producto = menuBebidas.find(b => b.id === id);
  }
  carrito.push({
    id: producto.id,
    nombre: producto.nombre,
    precio: producto.precio,
    tipo: tipo
  });
  localStorage.setItem('carrito',JSON.stringify(carrito));
  verCarrito();
}

//----- Carrito: aqui se produce toda la gestión del carrito para poder concretar la compra ------

function verCarrito() {
    const contenedor = document.getElementById('contenedor');
    let html =`
    <h1>Cerezo's Pizza </h1>
    <h2>Tu carrito</h2><ul class='carrito-list'>`;
    if (carrito.length === 0){
        html += `<li>El carrito está vacío</li>`;
    } else {
    carrito.forEach((item, idx) => {
      html += `<li><span>${item.tipo === "pizza" ? "🍕" : "🥤"}<strong> ${item.nombre}</strong> - $${item.precio}</span>
        <button class= 'eliminar' onclick='eliminarDelCarrito(${idx})'>Eliminar</button></li>`;
        });
    }
    html += `</ul>`;
  if (carrito.length > 0) {
    html += `<div><strong>Total: $${carrito.reduce((acc, el) => acc + el.precio, 0)}</strong></div>`;
    html += `<form id='formEntrega'>
      <h3>Datos de entrega</h3>
      <input type='text' id='nombre' placeholder='Nombre' required><br>
      <input type='text' id='direccion' placeholder='Dirección' required><br>
      <input type='tel' id='telefono' placeholder='Teléfono' required><br>
      <button id='finalizarCompra'>Finalizar compra</button>
    </form>`;
  }
  html += `<button class='button' id='volverMenu'>Volver</button>`;
  contenedor.innerHTML = html;
    document.getElementById('volverMenu').onclick = menuPrincipal;
  if (carrito.length > 0) {
    document.getElementById('formEntrega').onsubmit = finalizarCompra;
  }
}


//---- Función para eliminar productos del carrito ---
window.eliminarDelCarrito = function(idx){
    carrito.splice(idx, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    verCarrito();
}

//----- Concretar la compra ----

function finalizarCompra(e) {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const direccion = document.getElementById('direccion').value;
    const telefono = document.getElementById('telefono').value;
    if(!nombre || !direccion || !telefono) return;
    localStorage.setItem('carrito', JSON.stringify(carrito));
    document.getElementById('contenedor').innerHTML = `<h2>¡Gracias por tu compra, ${nombre}!</h2>
    <p>Tu pedido llegará a <strong>${direccion}</strong>.<br>Te contactaremos al <strong>${telefono}</strong>.</p>
    <button class='button' id='volverMenu'>Volver al inicio</button>`;
    document.getElementById('volverMenu').onclick = menuPrincipal;
}

//---- Iniciar la página ----

document.addEventListener('DOMContentLoaded', menuPrincipal);

