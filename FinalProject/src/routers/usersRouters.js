import { Router } from "express";
import { usersDao as api } from "../daos/index.js";
import Users from '../classes/users';

const router = new Router()

router.post("/", async (req, res) => {
    try {
        const createUser = await api.create(req.body);
        res.json(createUser)
    } catch (e) {
        res.status(413).send({ "Error": e.message });
        console.log(e)
    }
})

router.get("/", async (req, res) => {
    try {
        const allUsers = await api.getAll();
        res.json(allUsers)
    } catch (e) {
        res.status(413).send({ "Error": e.message });
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await api.getById(id);
        res.status(200).send(user);
    }
    catch (e) {
        res.status(413).send({ "Error": e.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const name = req.body.name;
        const surname = req.body.surname;

        const editUser = new Users();
        editUser.id = id;
        editUser.name = name;
        editUser.surname = surname;

        const filter = { _id: editUser.id };
        const update = { name: editUser.name, surname: editUser.surname };

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