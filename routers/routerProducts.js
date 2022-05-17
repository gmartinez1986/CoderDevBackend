const { Container, Products, obj } = require("../classes/products.js");

const { Router } = require("express");
const router = Router();


router.get('/productos', (req, res) => {

    try {
        const products = obj.getAll();

        res.status(200).send({ "products": products });
    }
    catch (e) {
        res.status(413).send({ "Error": e.message });
    }
});

router.get('/productos/:id', (req, res) => {

    try {
        const id = parseInt(req.params.id);
        const products = obj.getById(id);

        if (products != null) {
            res.status(200).send({ "products": products });
        } else {
            res.status(200).send({ "Error": "Producto no encontrado" });
        }
    }
    catch (e) {
        res.status(413).send({ "Error": e.message });
    }
});

router.post('/productos', (req, res) => {

    try {
        const title = req.body.title;
        const price = req.body.price;
        const thumbnail = req.body.thumbnail;

        const newProduct = new Products();
        newProduct.title = title;
        newProduct.price = price;
        newProduct.thumbnail = thumbnail;

        obj.save(newProduct);

        res.status(200).redirect('/productos');
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

module.exports = router