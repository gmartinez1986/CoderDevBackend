
const { obj, Products } = require("./classes/products.js");

const path = require('path');

const express = require('express');
const {Server : ioServer} =require('socket.io');
const http = require('http');
const app = express();

const httpServer = http.createServer(app);
const io = new ioServer(httpServer);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {

    const products = obj.getAll();

    res.render('pages/index',
        { title: "Ingrese Producto",
          products: products,
          Products: Products }
    );
});

// NUEVO SERVIDOR
io.on('connection',(socket)=>{
    console.log('nuevo cliente conectado',socket.id);
    const products = obj.getAll();
    socket.emit('products' , products);

    socket.on("newProduct", product =>{
        obj.save(product); 
        const products = obj.getAll();
        io.sockets.emit('products', products)
    })
})

const PORT = 8080
httpServer.listen(PORT,()=>{
    console.log(`Server on port ${PORT}`)
})