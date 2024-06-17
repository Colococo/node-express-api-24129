const express = require("express");
const app = express(); // este app va a ser nuestro servidor

const path = require('path'); //llamado dinamico


// middleware(detienen y redirigen): códigos que se ejecutan antes de que una petición HTTP llegue al manejador de rutas o antes de que un cliente reciba una respuesta 
// app.use(express.static('public')); //llamado estatico
app.use(express.static(path.join(__dirname, "public")));// llamado dinamico con path

app.use(express.urlencoded({extended: true})); // interprete de formularios
app.use(express.json()); //para recibir el body de un POST (interpreta)

// usando routs productos
// const productosRouter = require("./routes/productos.router");
// app.use('/productos', productosRouter); //esta linea pisa a la app.use que sigue, que es la raiz del proyecto, por eso usamos un prefijo: '/productos'
// *****  OTRA FORMA SIN USAR UNA VARIABLE ****
app.use('/productos', require("./routes/productos.router"));

// EL ORDEN DEPENDE, PORQUE SI ESTA LINEA ESTUBIESE PRIMERO QUE STATIC SERIA LEIDA
app.get("/", (req, res) => { // cuando entre una consulta por / responde..
    res.send('Hola express');
});

// ruta para devolver un archivo (sendFile) que esta en private/factura
app.get("/factura", (req, res) => {
    res.sendFile(path.join(__dirname, 'private', 'factura.html'));
    //res.sendFile(path.join(__dirname, 'private', 'Mattii.pdf'));
});
 
// ruta para el json frutas
app.get("/frutas", (req, res) => {
    res.sendFile(path.join(__dirname, 'frutas.json'));
});

// rutas parametrizadas - params (tienen parametros: id, etc)
// req.params.id ===> nos trae el valor del id que se busco en la barra del navegador
app.get("/productos/:id", (req, res) => {
    //console.log(req.params.id);
    res.send("ok: " + req.params.id);
});

// para hacer filtros, ordenar cuando tipeo desde la barra del navegador
// otra forma de pasar parametros: rutas parametrizadas - query
// van despues del signo ? clave valor
// NO VAN EN LA RUTA (app.get("aca no"), (req, res)=>{})
const PORT = 3000;

app.listen(PORT, ()=> console.log(`http://localhost:${PORT}`));
