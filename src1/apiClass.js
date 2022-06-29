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
            const res = await this.knex.from(this.table).insert(obj);
            return res;
        } catch (error) {
            throw new Error(`Error: ${error}`);
        }
    }

    async deleteById(id) {
        try {
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