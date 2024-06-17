const express = require('express');
const router = express.Router();

const productos = [
    {id: 1, nombre: "Producto Nro 1", stock:10},
    {id: 2, nombre: "Producto Nro 2", stock:5},
    {id: 3, nombre: "Producto Nro 3", stock:15}
]

// a este modulo llegamos con el prefijo: /productos
router.get('/', (req, res) => {
    // res.send('Listado de productos');
    // hacemos el mismo res.send pero simulando un json, porque las apis devuelven json
    // res.json({mensaje:'Listado de productos'});

    res.json(productos);
});

// ruta para regresar con un identificador
router.get('/:id', (req, res) => {
    console.log(req.params.id);
    // creo una variable: producto para recorrer con la funcion: find el arreglo: productos
    const producto = productos.find((elemento) => elemento.id == req.params.id); //req.params.is: nos devuelve el id que se tipea en la barra del navegador
    // respondiendo por si no existe el id-producto ingresado en el navegador
    if (!producto){
        return res.status(404).json({ error: "No esxiste el producto" });
    }; //al poner return se termina aca, no hace falta usar else

    res.send(producto);
});

// ***** Método POST: agrega un elemento ****
router.post('/', (req, res) => {
    console.log(req.body);

    // agregando un producto, ya tenemos los datos en postman del nombre y producto
    const producto = {
        id: productos.length + 1,
        nombre: req.body.nombre,
        stock: req.body.stock
    };
    // empujando el nuevo producto
    productos.push(producto);

    res.status(201).send(producto); //respondiendo con status, 201 creado
});

// ***** Método PUT: modifica por medio de un id, una parte de un elemento *****
router.put('/:id', (req, res) => {
    console.log(req.params); // info del id del elemento
    console.log(req.body); // el cuerpo del elemento

    // chequeamos si el producto al modificar existe
    const producto = productos.find((elemento) => elemento.id == req.params.id); 
    if (!producto){
        return res.status(404).json({ error: "No esxiste el producto" });
    };
    // si existe ejecutamos el put, usamos body porque estamos modifcando solo el cuerpo del elemento
    producto.nombre = req.body.nombre,
    producto.stock = req.body.stock

    res.send(producto);
});

// **** Método DELETE ****** borra un elemento por medio dl ig
router.delete('/:id', (req, res) => {
        // chequeamos si el producto al modificar existe
    const producto = productos.find((elemento) => elemento.id == req.params.id); 
    if (!producto){
        return res.status(404).json({ error: "No esxiste el producto" });
    };
    //al existir el elemento recorremos con findIndex() y el id el que coincide ejecutamos splice para que lo elimine
    const productoIndex = productos.findIndex((elemento) => elemento.id == req.params.id);
    // por si, que va a ser si, ejecutamos splice
    productos.splice(productoIndex, 1); // el 1 es que borre ese elemento

    res.send(producto); // mostramos el producto eliminado
});

module.exports = router;