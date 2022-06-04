import { Router } from 'express';
import Api from '../apiClass';
import Carts from '../classes/carts'
const router = Router();
const apiCart = new Api("/dataBase/carts.json");
const apiProduct = new Api("/dataBase/products.json");

router.post('/', async (req, res) => {
    try {
        const newCart = new Carts();
        newCart.timestamp = Date.now();

        const cart = await apiCart.save(newCart);
        res.status(200).json(cart)
    }
    catch (e) {
        res.status(413).send({ 'Error': e.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const cart = await apiCart.getById(parseInt(id));

        if (cart != null) {
            await apiCart.deleteById(parseInt(id));
            res.status(200).send({ "mensaje": "El carrito se elimino correctamente." });
        } else {
            res.status(200).send({ "Error": "Carrito no encontrado" });
        }
    }
    catch (e) {
        res.status(413).send({ 'Error': e.message });
    }
});

router.get('/:id/productos', async (req, res) => {
    try {
        const { id } = req.params;
        const cart = await apiCart.getById(parseInt(id));
        res.status(200).send({ "products": cart.products });
    }
    catch (e) {
        res.status(413).send({ "Error": e.message });
    }
});

router.post('/:id/productos', async (req, res) => {
    try {
        const { id } = req.params;
        const cart = await apiCart.getById(parseInt(id));

        if (cart === undefined) {          
            res.status(200).send({ "Error": "Carrito no encontrado" });
            return;
        }

        const idProduct = req.body.idProduct;
        const product = await apiProduct.getById(parseInt(idProduct));

        if (product === undefined) {          
            res.status(200).send({ "Error": "Producto no encontrado" });
            return;
        }

        if(cart.products === undefined)
        {
            cart.products = [];
        }

        cart.products.push(product);
        await apiCart.save(cart);
        res.status(200).json(cart);
    }
    catch (e) {
        res.status(413).send({ 'Error': e.message });
    }
});

router.delete('/:id/productos/:idProduct', async (req, res) => {
    try {
        const { id } = req.params;
        const cart = await apiCart.getById(parseInt(id));

        if (cart === undefined) {          
            res.status(200).send({ "Error": "Carrito no encontrado" });
            return;
        }
      
        const { idProduct } = req.params;

        cart.products = cart.products.filter(function (x) {
            return x.id !== parseInt(idProduct);
        });

        await apiCart.save(cart);
        res.status(200).json(cart);  
    }
    catch (e) {
        res.status(413).send({ 'Error': e.message });
    }
});

export default router;