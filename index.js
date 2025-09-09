//----- Clases: Pizza, Bebida/Gaseosa y Delivery ------

class Pizza {
    constructor(id, nombre, ingredientes, precio){
        this.id = id;
        this.nombre = nombre;
        this.ingredientes = ingredientes;
        this.precio = precio;
    }
}

class Bebida {
    constructor(id, nombre, precio){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
    }
}

class Delivery {
    constructor(zona, precio){
        this.zona = zona;
        this.precio = precio;
    }
}

//--------  Arreglos para: Pizzas, bebidas y zonas del delivery ----------- 

const menuPizzas = new Array();
menuPizzas.push(new Pizza(1, "Margarita", ["tomate cherry", "mozzarella", "albahaca"], 12000));
menuPizzas.push(new Pizza(2, "Pepperoni", ["tomate", "mozzarella", "pepperoni"], 11000));
menuPizzas.push(new Pizza(3, "Napolitana", ["mozzarella", "tomate", "orégano", "aceitunas"], 11500));
menuPizzas.push(new Pizza(4, "Pollo BBQ", ["mozzarella", "pollo", "salsa BBQ", "cebolla"], 13000));
menuPizzas.push(new Pizza(5, "Hawaiana", ["mozzarella", "jamón", "piña"], 12480));
menuPizzas.push(new Pizza(6, "Veggie", ["tomate", "mozzarella", "pimiento", "cebolla", "aceitunas"], 11500));
menuPizzas.push(new Pizza(7, "Garlic", ["mozzarella", "ajo", "perejil"], 11800));
menuPizzas.push(new Pizza(8, "Todas las carnes", ["mozzarella", "jamón", "pollo", "chorizo", "pimiento"], 14500));

const menuBebidas = new Array();
menuBebidas.push(new Bebida(1, "Coca-Cola 500 ml", 2000));
menuBebidas.push(new Bebida(2, "Coca-Cola Zero 500 ml", 2000));
menuBebidas.push(new Bebida(3, "Sprite 500 ml", 2000));
menuBebidas.push(new Bebida(4, "Fanta 500 ml", 2000));
menuBebidas.push(new Bebida(5, "Agua Mineral 500 ml", 1700));
menuBebidas.push(new Bebida(6, "Coca-Cola 1.5 lt", 3500));
menuBebidas.push(new Bebida(7, "Coca-Cola Zero 1.5 lt", 3500));
menuBebidas.push(new Bebida(8, "Sprite 1.5 lt", 3500));
menuBebidas.push(new Bebida(9, "Fanta 1.5 lt", 3500));
menuBebidas.push(new Bebida(10, "Agua Mineral 1.5 lt", 2500));

const menuDelivery = new Array();
menuDelivery.push(new Delivery("Zona Norte", 3500));
menuDelivery.push(new Delivery("Zona Centro", 3000));
menuDelivery.push(new Delivery("Zona Sur", 3500));

//-------- Carrito de compras --------
const carrito = [];

//-------- Bucle while principal --------

respuesta = true;

while(respuesta!= "salir" && respuesta){
    respuesta = seleccionarMenuaVer();
    if(respuesta === "salir"){
        alert("Gracias por visitarnos, ¡Vuelve pronto!");
        break;
    }
}

//-------- Función para seleccionar que menú ver --------

function seleccionarMenuaVer(){
    let seleccionarMenu = prompt("!Bienvenido a Cerezo's Pizza!, ¿Qué menú deseas ver?\n1. Menú de Pizzas\n2. Menú de Bebidas\n3. Ver mi Carrito\n4. Salir");
    if (seleccionarMenu === "1") {
        menuPizza();
        return true;
    } else if (seleccionarMenu === "2") {
        menuBebida();
        return true;
    } else if (seleccionarMenu === "3") {
        verCarrito();
        return true;
    } else if (seleccionarMenu === "4") {
        return "salir";
    } else if (seleccionarMenu == null) {
        return "salir";
    } else {
        alert("Opción no válida, por favor intenta nuevamente.");
        return true;
    }
}

//-------- Funciones para mostrar los menús de Pizzas y Bebidas --------

function menuPizza(){
    let stockPizzas = "";
    for (let i = 0; i < menuPizzas.length; i++) { //itera el menú Pizzas
        stockPizzas += `${menuPizzas[i].id}. ${menuPizzas[i].nombre} - $${menuPizzas[i].precio}\n   Ingredientes: ${menuPizzas[i].ingredientes.join(", ")}\n`;
    }
    let menu = " --- Menú de Pizzas ---\n" + stockPizzas;
    let seleccion = prompt(menu + "\nIngresa el número de la pizza para agregar al carrito, o presiona Cancelar para volver.");
    let pizzaSeleccionada = menuPizzas.find(p => p.id == seleccion);
    if (pizzaSeleccionada) {
        agregarAlCarrito(pizzaSeleccionada);
    } else if (seleccion !== null) {
        alert("Tu selección es inválida. Por favor, intenta de nuevo.");
    }
    return (seleccionarMenuaVer());
}

function menuBebida(){
    let stockBebidas = "";
    for (let i = 0; i < menuBebidas.length; i++) {
        stockBebidas += `${menuBebidas[i].id}. ${menuBebidas[i].nombre} - $${menuBebidas[i].precio}\n`;
    }
    let menu = " --- Menú de Bebidas ---\n" + stockBebidas;
    let seleccion = prompt(menu + "\nIngresa el número de la bebida para agregar al carrito, o presiona Cancelar para volver.");
    let bebidaSeleccionada = menuBebidas.find(b => b.id == seleccion);
    if (bebidaSeleccionada) {
        agregarAlCarrito(bebidaSeleccionada);
    } else if (seleccion !== null) {
        alert("Tu selección es inválida. Por favor, intenta de nuevo.");
    }
    return (seleccionarMenuaVer());
}

//-------- Función para agregar productos al carrito --------
function agregarAlCarrito(producto) {
    carrito.push(producto);
    alert(`${producto.nombre} agregada al carrito.`);
}

//-------- Función para ver el carrito de compras --------

function verCarrito(){
    let carritoTexto = " --- Carrito de Compras ---\n";
    if (carrito.length === 0) {
        carritoTexto += "Tu carrito está actualmente vacío.\n¡Agrega productos para verlos aquí!";
        alert(carritoTexto);
    } else {
        let total = 0;
        carrito.forEach(producto => {
            carritoTexto += `${producto.nombre} - $${producto.precio}\n`;
            total += producto.precio;
        });
        carritoTexto += `\nTotal a pagar: $${total}\n\n`;
        let finalizar = prompt(carritoTexto + "¿Deseas finalizar la compra? (Sí/No)");
        if (finalizar && finalizar.toLowerCase() === "si") {
            calcularEnvio(total); // Solo ejecuta, no retorna
        } else {
            alert(carritoTexto + "Puedes seguir agregando productos a tu carrito.");
        }
    }
}

// ------- Función para calcular el costo final (dependiendo si elige retiro o delivery) --------

function calcularEnvio(total){
    let elegirEntrega = parseInt(prompt("¿Deseas entrega a domicilio o recoger en tienda? (1. Domicilio, 2. Recoger)"));
    if (elegirEntrega === 1) {
        let elegirZona = parseInt(prompt("¿En qué zona te encuentras? \n 1. Zona Norte \n 2. Zona Centro \n 3. Zona Sur"));
        let costoEnvio = 0;
        if (elegirZona === 1) {
            costoEnvio = menuDelivery[0].precio;
        } else if (elegirZona === 2) {
            costoEnvio = menuDelivery[1].precio;
        } else if (elegirZona === 3) {
            costoEnvio = menuDelivery[2].precio;
        }
        total += costoEnvio;
        alert(`El costo de envío es $${costoEnvio}. Total final a pagar: $${total}\n¡Gracias por tu compra!`);
        carrito.length = 0; // vacia el carrito luego de concretar la compra
    } else if (elegirEntrega === 2) {
        alert(`Total a pagar en tienda: $${total}\n¡Gracias por tu compra!`);
        carrito.length = 0; // vacia el carrito luego de concretar la compra
    } else {
        while (elegirEntrega !== 1 && elegirEntrega !== 2) {
            alert("Opción inválida. Por favor, selecciona 1 (Domicilio), 2 (Recoger) o cancelar para volver al menú.");
            elegirEntrega = parseInt(prompt("¿Deseas entrega a domicilio o recoger en tienda? (1. Domicilio, 2. Recoger)"));
            if (elegirEntrega === 1) {
                let elegirZona = parseInt(prompt("¿En qué zona te encuentras? \n 1. Zona Norte \n 2. Zona Centro \n 3. Zona Sur"));
                let costoEnvio = 0;
                if (elegirZona === 1) {
                    costoEnvio = menuDelivery[0].precio;
                } else if (elegirZona === 2) {
                    costoEnvio = menuDelivery[1].precio;
                } else if (elegirZona === 3) {
                    costoEnvio = menuDelivery[2].precio;
                }
                total += costoEnvio;
                alert(`El costo de envío es $${costoEnvio}. Total final a pagar: $${total}\n¡Gracias por tu compra!`);
                carrito.length = 0; // vaciar el carrito luego de concretar la compra
                break;
            } else if (elegirEntrega === 2) {
                alert(`Total a pagar en tienda: $${total}\n¡Gracias por tu compra!`);
                carrito.length = 0; // vaciar el carrito luego de concretar la compra
                break;
            }
        }
    }
    return total;
}