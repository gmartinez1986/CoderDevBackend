import express from "express"
import Mocks from './mocks/mocks.js'
const app = express()
const path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.get('/api/productos-test',async(req,res)=>{
    const mock = new Mocks(5);
    const products = mock.mockProducts();
    res.render('mockProducts.ejs', {products}) 
})

const PORT = 8080
app.listen(PORT,()=>{
    console.log(`Escuchando al puerto ${PORT}`)
})