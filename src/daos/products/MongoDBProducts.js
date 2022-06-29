import MongoClass from "../../containers/MongoClass.js";

export class MongoDBProducts extends MongoClass {
    constructor() {
        super('products', {
            title: { type: String, required: true },
            price: { type: Number, required: true },
            thumbnail: { type: String, required: true }
        })
    }
}