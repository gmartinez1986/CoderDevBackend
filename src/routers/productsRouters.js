import { Router } from "express";
import { productsDao as api } from "../daos/index.js";
import Products from '../classes/products';

const router = new Router()

router.post("/", async (req, res) => {
    try {
        const createProduct = await api.create(req.body);
        res.json(createProduct)
    } catch (e) {
        res.status(413).send({ "Error": e.message });
        console.log(e)
    }
})

router.get("/", async (req, res) => {
    try {
        const allProducts = await api.getAll();
        res.json(allProducts)
    } catch (e) {
        res.status(413).send({ "Error": e.message });
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await api.getById(id);
        res.status(200).send(product);
    }
    catch (e) {
        res.status(413).send({ "Error": e.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const timestamp = req.body.timestamp;
        const name = req.body.name;
        const description = req.body.description;
        const code = req.body.code;
        const photo = req.body.photo;
        const price = req.body.price;
        const stock = req.body.stock;

        const editProduct = new Products();
        editProduct.id = id;
        editProduct.timestamp = timestamp;
        editProduct.name = name;
        editProduct.description = description;
        editProduct.code = code;
        editProduct.photo = photo;
        editProduct.price = price;
        editProduct.stock = stock;

        const filter = { _id: editProduct.id };
        const update = {
            timestamp: editProduct.timestamp,
            name: editProduct.name, 
            description: editProduct.description,
            code: editProduct.code,
            photo: editProduct.photo,
            price: editProduct.price,
            stock: editProduct.stock,
        };

        const apiRes = await api.update(filter, update);
        res.status(200).send(apiRes);
    }
    catch (e) {
        res.status(413).send({ 'Error': e.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const apiRes = await api.delete(id);
        res.status(200).send(apiRes);
    }
    catch (e) {
        res.status(413).send({ 'Error': e.message });
    }
});

export default router