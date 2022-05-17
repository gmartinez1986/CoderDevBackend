
const { obj } = require("./classes/products.js");

const express = require('express');
const app = express();

const routerProducts = require("./routers/routerProducts.js");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', routerProducts);
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('pages/index',
        { title: "Ingrese Producto" }
    );
});

app.get('/productos', function (req, res) {

    const products = obj.getAll();

    res.render('pages/products',
        { title: "Lista de Productos",
          products: products}
    );
});

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on("error", error => console.log(`Error en servidor ${error}`))