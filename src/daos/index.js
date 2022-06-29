import dotenv from 'dotenv'
dotenv.config()

let usersDao, productDao

switch (process.env.DB_NAME) {
    case "mongoDB":
        import("./users/MongoDBUsers.js").then(({MongoDBUsers}) =>{
            usersDao = new MongoDBUsers()
        })
        import("./products/MongoDBProducts.js").then(({MongoDBProducts}) =>{
            productDao = new MongoDBProducts()
        })
        break;
    default:
        break;
}

export {usersDao, productDao}