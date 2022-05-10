
const express = require('express');

const routerProducts = require("./routers/routerProducts.js");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routerProducts);

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on("error", error => console.log(`Error en servidor ${error}`))

