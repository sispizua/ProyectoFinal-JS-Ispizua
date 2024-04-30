class Producto {
    constructor(id, nombre, precio, img) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
        this.cantidad = 1; 
    }
}

const Deliciosa = new Producto(1, "Monstera Deliciosa", 3500, "img/deliciosa.png");
const Amazonica = new Producto(2, "Alocasia Amazonica", 4300, "img/Amazonica.webp");
const Variagada = new Producto(3, "Monstera Variagada", 5000, "img/variegada.webp");
const Macrorhiza = new Producto(4, "Alocasia Macrorhiza", 2800, "img/macrorhiza.webp");
const Adansonii = new Producto(5, "Monstera Adansonii", 2800, "img/adansonii.webp");
const Zebrina = new Producto(6, "Alocasia Zebrina", 4200, "img/zebrina.png");
const Sustrato = new Producto(7, "Sustrato universal", 2000, "img/sustrato.png");
const Pilea = new Producto(8, "Pilea", 2500, "img/pilea.webp");

const productos = [Deliciosa, Amazonica, Variagada, Macrorhiza, Adansonii, Zebrina, Sustrato, Pilea];

let carrito = []; 

if(localStorage.getItem("carrito")){
    carrito = JSON.parse(localStorage.getItem("carrito"));
}

const contenedorProductos = document.getElementById("contenedorProductos");
const inputBusqueda = document.getElementById("inputBusqueda");


const mostrarProductos = () => {
    contenedorProductos.innerHTML = "";
    
    productos.forEach( producto => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
            <div class="card">
                <img src="${producto.img}" class="card-img-top imgProductos" alt="${producto.nombre}">
                <div class="card-body">
                    <h5>${producto.nombre}</h5>
                    <p>$${producto.precio}</p>
                    <button class="btn colorBoton" id="boton${producto.id}" > Agregar al Carrito </button>
                </div>
            </div>
        `;
        contenedorProductos.appendChild(card);

        const boton = document.getElementById(`boton${producto.id}`);
        boton.addEventListener("click", () => {
            agregarAlCarrito(producto.id);
        });
    });
}

mostrarProductos();

inputBusqueda.addEventListener("input", () => {
    const busqueda = inputBusqueda.value.toLowerCase();
    const productosFiltrados = productos.filter(producto => producto.nombre.toLowerCase().includes(busqueda));
    mostrarProductosFiltrados(productosFiltrados);
});



const mostrarProductosFiltrados = (productosFiltrados) => {
    contenedorProductos.innerHTML = "";
    
    productosFiltrados.forEach( producto => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
            <div class="card">
                <img src="${producto.img}" class="card-img-top imgProductos" alt="${producto.nombre}">
                <div class="card-body">
                    <h5>${producto.nombre}</h5>
                    <p>${producto.precio}</p>
                    <button class="btn colorBoton" id="boton${producto.id}" > Agregar al Carrito </button>
                </div>
            </div>
        `;
        contenedorProductos.appendChild(card);

        const boton = document.getElementById(`boton${producto.id}`);
        boton.addEventListener("click", () => {
            agregarAlCarrito(producto.id);
        });
    });
}

const agregarAlCarrito = (id) => {
    const productoEnCarrito = carrito.find(producto => producto.id === id);
    if(productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        const producto = productos.find(producto => producto.id === id);
        carrito.push(producto);
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    calcularTotal();
}

const contenedorCarrito = document.getElementById("contenedorCarrito");
const verCarrito = document.getElementById("verCarrito")

verCarrito.addEventListener("click", () => {
    mostrarCarrito();
})

const mostrarCarrito = () => {
    contenedorCarrito.innerHTML = "";

    carrito.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
            <div class="card">
                <img src="${producto.img}" class="card-img-top imgProductos" alt="${producto.nombre}">
                <div class="card-body">
                    <h5>${producto.nombre}</h5>
                    <p>$${producto.precio}</p>
                    <p>${producto.cantidad}</p>
                    <button class="btn colorBoton" id="eliminar${producto.id}" > Eliminar Producto </button>
                </div>
            </div>
        `;
        contenedorCarrito.appendChild(card);

        const boton = document.getElementById(`eliminar${producto.id}`);
        boton.addEventListener("click", () => {
            eliminarDelCarrito(producto.id);
        });
    });
    calcularTotal();
}

const eliminarDelCarrito = (id) => {
    const producto = carrito.find(producto => producto.id === id);
    const indice = carrito.indexOf(producto);
    carrito.splice(indice, 1);
    mostrarCarrito();
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

const vaciarCarrito = document.getElementById("vaciarCarrito");

vaciarCarrito.addEventListener("click", () => {
    eliminarTodoElCarrito();
})

const eliminarTodoElCarrito = () => {
    carrito = [];
    mostrarCarrito();
    localStorage.clear();
}

const total = document.getElementById("total");

const calcularTotal = () => {
    let totalCompra = 0;
    carrito.forEach(producto => {
        totalCompra += producto.precio * producto.cantidad;
    })
    total.innerHTML = `$${totalCompra}`;
}


