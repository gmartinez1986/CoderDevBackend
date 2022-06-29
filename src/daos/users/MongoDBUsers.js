import MongoClass from "../../containers/MongoClass.js";

export class MongoDBUsers extends MongoClass {
    constructor() {
        super('users', {
            name: { type: String, required: true },
            surname: { type: String, required: true }
        })
    }
}