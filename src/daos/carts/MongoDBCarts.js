import MongoClass from "../../containers/MongoClass.js";
import MongoDBProducts from "../products/MongoDBProducts.js" 

export class MongoDBCarts extends MongoClass {
    constructor() {
        super('carts', {
            timestamp: { type: Date, required: true },
            products:
                [{
                    timestamp: { type: String, required: true },
                    name: { type: String, required: true },
                    description: { type: String, required: true },
                    code: { type: Number, required: true },
                    photo: { type: String, required: true },
                    price: { type: Number, required: true },
                    stock: { type: Number, required: true }
                }]
        })
    }
}