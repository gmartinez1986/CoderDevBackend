import fs from "fs";

export default class Api {

    constructor(BDPath) {
        this.BDPath = __dirname + BDPath;
    }

    async getAll() {
        try {
            const objs = await fs.promises.readFile(this.BDPath, "utf-8");
            return JSON.parse(objs);
        }
        catch (err) {
            throw new Error(`Error: ${error}`);
        }
    }

    async getById(id) {
        try {
            const objs = await this.findAll()
            const res = objs.find(e => e.id == id)
            return res
        } catch (error) {
            throw new Error(`Error: ${error}`);
        }
    }

    async save(obj) {
        try {
            const objs = await this.findAll()
            let id
            objs.length === 0
                ? id = 1
                : id = objs[objs.length - 1].id + 1

            objs.push({ ...obj, id })

            await fs.promises.writeFile(this.rutaBD, JSON.stringify(objs))
            return id
        } catch (error) {
            throw new Error(`Error: ${error}`);
        }
    }

    async deleteById(id) {
        try {
            const objs = await this.findAll()
            if (objs.length === 0) {
                return;
            }
            objs = objs.filter(function (x) {
                return x.id !== id;
            });
            await fs.promises.writeFile(this.rutaBD, JSON.stringify(objs))
        } catch (error) {
            throw new Error(`Error: ${error}`);
        }
    }

    async deleteAll() {
        try {
            const objs = await this.findAll()
            objs = [];
            await fs.promises.writeFile(this.rutaBD, JSON.stringify(objs))
        } catch (error) {
            throw new Error(`Error: ${error}`);
        }
    }
}