import mongoose from "mongoose"
import config from "../config.js"

mongoose.connect(config.mongoDB.URL, config.mongoDB.options)

class MongoClass{
    constructor(collectionName, docSchema){
        this.collection = mongoose.model(collectionName, docSchema)
    }

    async create(obj){
        try{
            const newUser = await this.collection.create(obj);
            return newUser
        }catch (error){
            throw new Error(error)
        }
    }

    async getAll(){
        try{
            const res = await this.collection.find({});
            return res
        }catch (error){
            throw new Error(error)
        }
    }

    async getById(id){
        try{
            const res = await this.collection.find({"_id" : id});
            return res
        }catch (error){
            throw new Error(error)
        }
    }

    async update(filter, update){
        try{
            const res = await this.collection.updateOne(filter, update);
            return res
        }catch (error){
            throw new Error(error)
        }
    }

    async delete(id){
        try{
            const filter = { _id: id };

            const res = await this.collection.deleteOne(filter);
            return res
        }catch (error){
            throw new Error(error)
        }
    }
}

export default MongoClass