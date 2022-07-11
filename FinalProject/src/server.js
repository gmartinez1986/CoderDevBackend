import express from "express"
import usersRouters from './routers/usersRouters.js'
import productsRouters from './routers/productsRouters.js'
import cartsRouters from './routers/cartsRouters.js'
const app = express()

app.use(express.json())
app.use("/users", usersRouters)
app.use("/products", productsRouters)
app.use("/carts", cartsRouters)

const PORT = 8080
app.listen(PORT,()=>{
    console.log(`Escuchando al puerto ${PORT}`)
})