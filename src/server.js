import express from 'express';
import knex from 'knex';
import { options } from './dataBase/configDB';
import Api from './apiClass';

const path = require('path');
const { Server: ioServer } = require('socket.io');
const http = require('http');
const app = express();
const httpServer = http.createServer(app);
const io = new ioServer(httpServer);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Creao las tablas.
(async () => {
    try {
        let exist = await knex(options.sqlite).schema.hasTable('products');
        if (!exist) {
            await knex(options.sqlite).schema.createTable('products', table => {
                table.increments('id').primary().unique();
                table.string('title').notNullable();
                table.decimal('price').notNullable();
                table.string('thumbnail').notNullable();
            }).then(() => { console.log("table products created"); })
        }

        exist = await knex(options.sqlite).schema.hasTable('messages');
        if (!exist) {
            await knex(options.sqlite).schema.createTable('messages', table => {
                table.increments('id').primary().unique();
                table.string('email').notNullable();
                table.string('text').notNullable();
                table.date('date').notNullable();
            }).then(() => { console.log("table messages created"); })
        }
    } catch (err) {
        throw err;
    }
})()

const apiProducts = new Api(options.sqlite, "products");
const apiMessages = new Api(options.sqlite, "messages");

app.get('/', function (req, res) {

    const products = apiProducts.getAll();

    res.render('pages/index',
        {
            title: "Ingrese Producto",
            products: products
        }
    );
});

io.on('connection', async (socket) => {
    console.log('nuevo cliente conectado', socket.id);
    const products = await apiProducts.getAll();
    socket.emit('products', products);

    socket.on("newProduct", async product => {
        await apiProducts.save(product);
        const products = await apiProducts.getAll();
        io.sockets.emit('products', products)
    });

    const messages = await apiMessages.getAll();
    socket.emit('messages', messages);

    socket.on("newMessage", async message => {
        await apiMessages.save(message);
        const messages = await apiMessages.getAll();
        io.sockets.emit('messages', messages)
    });
})

const PORT = 8080
httpServer.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})