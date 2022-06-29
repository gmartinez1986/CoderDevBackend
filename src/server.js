import express from "express"
import usersRouters from './routers/usersRouters.js'
const app = express()

app.use(express.json())
app.use("/users", usersRouters)

const PORT = 8080
app.listen(PORT,()=>{
    console.log(`Escuchando al puerto ${PORT}`)
})