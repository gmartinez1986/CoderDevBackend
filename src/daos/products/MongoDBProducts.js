import MongoClass from "../../containers/MongoClass.js";

export class MongoDBProducts extends MongoClass {
    constructor() {
        super('products', {
            timestamp: { type: String, required: true },
            name: { type: String, required: true },
            description: { type: String, required: true },
            code: { type: Number, required: true },
            photo: { type: String, required: true },
            price: { type: Number, required: true },
            stock: { type: Number, required: true }
        })
    }
}