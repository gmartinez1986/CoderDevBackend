import express from 'express';
import morgan from 'morgan';
import productsRoutes from './routers/products';
const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/productos', productsRoutes);

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})