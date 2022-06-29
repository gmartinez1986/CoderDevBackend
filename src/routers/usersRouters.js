import { Router } from "express";
import {usersDao as api} from "../daos/index.js";

const router = new Router()
//const api =  usersDao()

router.get("/", async (req, res) => {
    try{
        const allUsers = await api.getAll();
        res.json(allUsers)
    }catch(error){
        console.log(error)
    }
})

router.post("/", async (req, res) => {
    try{
        const createUser = await api.create(req.body);
        res.json(createUser)
    }catch(error){
        console.log(error)
    }
})

export default router