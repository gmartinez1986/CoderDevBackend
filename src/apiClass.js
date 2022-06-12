import knex from "knex";

export default class Api {

    constructor(options, table) {
        this.knex = knex(options);
        this.table = table;
    }

    async getAll() {
        try {
            const res = await this.knex.from(this.table).select("*");
            return res;
        }
        catch (error) {
            throw new Error(`Error: ${error}`);
        }
    }

    async getById(id) {
        try {
            const res = await this.knex.from(this.table).select("*").where("id", id);
            return res
        } catch (error) {
            throw new Error(`Error: ${error}`);
        }
    }

    async save(obj) {
        try {
         /*   const objs = await this.getAll()
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
            return obj*/
            const res = await this.knex.from(this.table).insert(obj);
            return res;
        } catch (error) {
            throw new Error(`Error: ${error}`);
        }
    }

    async deleteById(id) {
        try {
            /*let objs = await this.getAll();
            if (objs.length === 0) {
                return;
            }
            objs = objs.filter(function (x) {
                return x.id !== id;
            });
            await fs.promises.writeFile(this.BDPath, JSON.stringify(objs))*/
           const res = await this.knex.from(this.table).where("id", id).del();
           return res;
        } catch (error) {
            throw new Error(`Error: ${error}`);
        }
    }

    async deleteAll(){
        try {
            return await this.knex.from(this.table).del();
        } catch (error) {
            throw new Error(`Error: ${error}`);
        }
    }
}