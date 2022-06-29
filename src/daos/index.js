import dotenv from 'dotenv'
dotenv.config()

let usersDao, productsDao, cartsDao

switch (process.env.DB_NAME) {
    case "mongoDB":
        import("./users/MongoDBUsers.js").then(({MongoDBUsers}) =>{
            usersDao = new MongoDBUsers()
        })
        import("./products/MongoDBProducts.js").then(({MongoDBProducts}) =>{
            productsDao = new MongoDBProducts()
        })
        import("./carts/MongoDBCarts.js").then(({MongoDBCarts}) =>{
            cartsDao = new MongoDBCarts()
        })
        break;
    default:
        break;
}

export {usersDao, productsDao, cartsDao}