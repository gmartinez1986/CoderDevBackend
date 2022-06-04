import { Router } from 'express';
import Api from '../apiClass';
import Products from '../classes/products'
const router = Router();
const api = new Api("/dataBase/products.json");

router.get('/', async (req, res) => {
    try {
        const products = await api.getAll();
        res.status(200).json({ "products": products });
    }
    catch (e) {
        res.status(413).send({ "Error": e.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const product = await api.getById(id);
        res.status(200).send({ "product": product });
    }
    catch (e) {
        res.status(413).send({ "Error": e.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const timestamp = req.body.timestamp;
        const name = req.body.name;
        const description = req.body.description;
        const code = req.body.code;
        const photo = req.body.photo;
        const price = req.body.price;
        const stock = req.body.stock;

        const newProduct = new Products();
        newProduct.timestamp = timestamp;
        newProduct.name = name;
        newProduct.description = description;
        newProduct.code = code;
        newProduct.photo = photo;
        newProduct.price = price;
        newProduct.stock = stock;

        obj.save(newProduct);
        res.status(200).json(newProduct)
    }
    catch (e) {
        res.status(413).send({ 'Error': e.message });
    }
});

router.put('/productos/:id', (req, res) => {

    try {
        const id = parseInt(req.params.id);
        const title = req.body.title;
        const price = req.body.price;
        const thumbnail = req.body.thumbnail;

        const editProduct = new Products();
        editProduct.id = id;
        editProduct.title = title;
        editProduct.price = price;
        editProduct.thumbnail = thumbnail;

        const product = obj.save(editProduct);

        res.status(200).send({ "products": product });
    }
    catch (e) {
        res.status(413).send({ 'Error': e.message });
    }
});

router.delete('/productos/:id', (req, res) => {

    try {
        const id = parseInt(req.params.id);
        const product = obj.getById(id);

        if (product != null) {
            obj.deleteById(id);
            res.status(200).send({ "mensaje": "El producto se elimino correctamente." });
        } else {
            res.status(200).send({ "Error": "Producto no encontrado" });
        }
    }
    catch (e) {
        res.status(413).send({ 'Error': e.message });
    }
});

export default router;