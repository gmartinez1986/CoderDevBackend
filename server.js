
const modProdct = require("./products.js");

const express = require('express');

const app = express();

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on("error", error => console.log(`Error en servidor ${error}`))

app.get('/', (req, res) => {
    res.send({ mesaje: 'Hola Mundo'});
});

app.get('/productos', async (req, res) => {

    try{
  
        const obj =  new modProdct.CONTAINER('products.txt');
        const products  = await obj.getAll();

        res.status(200).send({"products": products});
    }
    catch(e){
        res.status(413).send({"Error": e.message});
    }
});

app.get('/productoRandom', async (req, res) => {

    try{
  
        const obj =  new modProdct.CONTAINER('products.txt');
        let id = Math.floor(Math.random() * 3) + 1;

        const product = await obj.getById(id);

        res.status(200).send({"products": product});
    }
    catch(e){
        res.status(413).send({"Error": e.message});
    }
});
