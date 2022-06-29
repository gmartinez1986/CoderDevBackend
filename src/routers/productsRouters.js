import { Router } from "express";
import { productDao as api } from "../daos/index.js";
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
        const title = req.body.title;
        const price = req.body.price;
        const thumbnail = req.body.thumbnail;

        const editProduct = new Products();
        editProduct.id = id;
        editProduct.title = title;
        editProduct.price = price;
        editProduct.thumbnail = thumbnail;

        const filter = { _id: editProduct.id };
        const update = { title: editProduct.title, price: editProduct.price, thumbnail: editProduct.thumbnail };

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