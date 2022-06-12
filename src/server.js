import express from 'express';
import morgan from 'morgan';
import productsRoutes from './routers/products';
import cartsRoutes from './routers/carts';
import knex from 'knex';
import { options } from './dataBase/configDB';

//Creao la tabla productos.
(async () => {
    try {
        const exist = await knex(options.sqlite).schema.hasTable('products');
        if (!exist) {
            await knex(options.sqlite).schema.createTable('products', table => {
                table.increments('id').primary().unique();
                table.string('title').notNullable();
                table.decimal('price').notNullable();
                table.string('thumbnail').notNullable();
            }).then(() => { console.log("table products created"); })
        }
    } catch (err) {
        throw err;
    }
})()

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/productos', productsRoutes);
app.use('/api/carrito', cartsRoutes);

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})
