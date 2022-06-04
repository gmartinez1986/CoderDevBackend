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
        catch (error) {
            throw new Error(`Error: ${error}`);
        }
    }

    async getById(id) {
        try {
            const objs = await this.getAll()
            const res = objs.find(e => e.id == id)
            return res
        } catch (error) {
            throw new Error(`Error: ${error}`);
        }
    }

    async save(obj) {
        try {
            const objs = await this.getAll()
            if (obj.id === undefined) {
                let id
                objs.length === 0
                    ? id = 1
                    : id = objs[objs.length - 1].id + 1;

                objs.push({ ...obj, id });
                obj.id = id;
            } else {
                const index = objs.findIndex(x => x.id === obj.id);
                objs[index] = obj;
            }

            await fs.promises.writeFile(this.BDPath, JSON.stringify(objs))
            return obj
        } catch (error) {
            throw new Error(`Error: ${error}`);
        }
    }

    async deleteById(id) {
        try {
            let objs = await this.getAll();
            if (objs.length === 0) {
                return;
            }
            objs = objs.filter(function (x) {
                return x.id !== id;
            });
            await fs.promises.writeFile(this.BDPath, JSON.stringify(objs))
        } catch (error) {
            throw new Error(`Error: ${error}`);
        }
    }

    async deleteAll() {
        try {
            const objs = await this.getAll();
            objs = [];
            await fs.promises.writeFile(this.BDPath, JSON.stringify(objs))
        } catch (error) {
            throw new Error(`Error: ${error}`);
        }
    }
}