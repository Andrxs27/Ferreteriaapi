const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =========================
// PRODUCTOS
// =========================
let productos = [];

// Obtener todos los productos
app.get('/productos', (req, res) => {
    res.json(productos);
});

// Crear nuevo producto
app.post('/productos', (req, res) => {
    const { idProducto, nombre, categoria, precio, stock } = req.body;

    const existe = productos.find(p => p.idProducto === idProducto);
    if (existe) {
        return res.status(400).json({ error: 'El producto ya existe' });
    }

    const nuevoProducto = { idProducto, nombre, categoria, precio, stock };
    productos.push(nuevoProducto);
    res.status(201).json(nuevoProducto);
});

// Actualizar producto
app.put('/productos/:id', (req, res) => {
    const id = req.params.id;
    const { nombre, categoria, precio, stock } = req.body;

    const productoIndex = productos.findIndex(p => p.idProducto === id);
    if (productoIndex === -1) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }

    if (nombre) productos[productoIndex].nombre = nombre;
    if (categoria) productos[productoIndex].categoria = categoria;
    if (precio) productos[productoIndex].precio = precio;
    if (stock !== undefined) productos[productoIndex].stock = stock;

    res.json(productos[productoIndex]);
});

// Eliminar producto
app.delete('/productos/:idProducto', (req, res) => {
    const id = req.params.idProducto;

    const productoIndex = productos.findIndex(p => p.idProducto === id);
    if (productoIndex === -1) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }

    const eliminado = productos.splice(productoIndex, 1);
    res.json({ mensaje: 'Producto eliminado', producto: eliminado[0] });
});

// =========================
// CLIENTES
// =========================
let clientes = [];

// Obtener todos los clientes
app.get('/clientes', (req, res) => {
    res.json(clientes);
});

// Crear cliente
app.post('/clientes', (req, res) => {
    const { idCliente, identificacion, nombres, telefono, correo } = req.body;

    const existe = clientes.find(c => c.idCliente === idCliente);
    if (existe) {
        return res.status(400).json({ error: 'El cliente ya existe' });
    }

    const nuevoCliente = { idCliente, identificacion, nombres, telefono, correo };
    clientes.push(nuevoCliente);
    res.status(201).json(nuevoCliente);
});

// Actualizar cliente
app.put('/clientes/:id', (req, res) => {
    const id = req.params.id;
    const { identificacion, nombres, telefono, correo } = req.body;

    const clienteIndex = clientes.findIndex(c => c.idCliente === id);
    if (clienteIndex === -1) {
        return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    if (identificacion) clientes[clienteIndex].identificacion = identificacion;
    if (nombres) clientes[clienteIndex].nombres = nombres;
    if (telefono) clientes[clienteIndex].telefono = telefono;
    if (correo) clientes[clienteIndex].correo = correo;

    res.json(clientes[clienteIndex]);
});

// Eliminar cliente
app.delete('/clientes/:idCliente', (req, res) => {
    const id = req.params.idCliente;

    const clienteIndex = clientes.findIndex(c => c.idCliente === id);
    if (clienteIndex === -1) {
        return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    const eliminado = clientes.splice(clienteIndex, 1);
    res.json({ mensaje: 'Cliente eliminado', cliente: eliminado[0] });
});

// =========================
// INICIAR SERVIDOR
// =========================
app.listen(3000, () => {
    console.log('Servidor Ferretería escuchando en http://localhost:3000');
});
