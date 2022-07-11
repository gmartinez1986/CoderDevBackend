import { Router } from "express";
import { cartsDao as apiCart } from "../daos/index.js";
import { productsDao as apiProduct } from "../daos/index.js";
import Carts from '../classes/carts.js';

const router = new Router()

router.post('/', async (req, res) => {
    try {
        const newCart = new Carts();
        newCart.timestamp = Date.now();

        const cart = await apiCart.create(newCart);
        res.status(200).json(cart)
    }
    catch (e) {
        res.status(413).send({ 'Error': e.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const allCarts = await apiCart.getAll();
        res.status(200).send(allCarts);
    }
    catch (e) {
        res.status(413).send({ "Error": e.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const cart = await apiCart.getById(id);
        res.status(200).send(cart);
    }
    catch (e) {
        res.status(413).send({ "Error": e.message });
    }
});

router.get('/:id/products', async (req, res) => {
    try {
        const { id } = req.params;
        const cart = await apiCart.getById(id);
        if(cart == undefined){
            res.status(200).send({ "Error": "Carrito no encontrado" });
            return;
        }

        res.status(200).send(cart[0].products);
    }
    catch (e) {
        res.status(413).send({ "Error": e.message });
    }
});

router.post('/:id/products', async (req, res) => {
    try {
        const { id } = req.params;
        const cart = await apiCart.getById(id);

        if (cart === undefined) {          
            res.status(200).send({ "Error": "Carrito no encontrado" });
            return;
        }

        const idProduct = req.body.idProduct;
        const product = await apiProduct.getById(idProduct);

        if (product === undefined) {          
            res.status(200).send({ "Error": "Producto no encontrado" });
            return;
        }

        const filter = { _id: id };
        const update = {$push: {products: product}};
        
        const resApi = await apiCart.update(filter, update);
        res.status(200).json(resApi);
    }
    catch (e) {
        res.status(413).send({ 'Error': e.message });
    }
});

router.delete('/:id/products/:idProduct', async (req, res) => {
    try {
        const { id } = req.params;
        const cart = await apiCart.getById(id);

        if (cart === undefined) {          
            res.status(200).send({ "Error": "Carrito no encontrado" });
            return;
        }
      
        const idProduct = req.body.idProduct;
        const product = await apiProduct.getById(idProduct);

        if (product === undefined) {          
            res.status(200).send({ "Error": "Producto no encontrado" });
            return;
        }

        const filter = { _id: id };
        const update = { $pull: { products: {_id: idProduct} } };

        const resApi = await apiCart.update(filter, update);
        res.status(200).json(resApi);  
    }
    catch (e) {
        res.status(413).send({ 'Error': e.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const cart = await apiCart.getById(id);

        if (cart != null) {
            const resApi = await apiCart.delete(id);
            res.status(200).send(resApi);
        } else {
            res.status(200).send({ "Error": "Carrito no encontrado" });
        }
    }
    catch (e) {
        res.status(413).send({ 'Error': e.message });
    }
});

export default router