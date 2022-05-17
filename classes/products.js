
//Clase Contenedor.
class Container {

    constructor() {
        this.products = [];
    }

    save(product) {

        try {
            if (this.products.length === 0) {
                product.id = 1
                this.products.push(product);
            } else {
                if(product.id === undefined){
                    let lastId = this.products[this.products.length - 1].id;
                    product.id = ++lastId;
                    this.products.push(product);
                }else{
                    const editProduct = this.products.find(prod => prod.id === product.id);
                    editProduct.title = product.title;
                    editProduct.price = product.price;
                    editProduct.thumbnail = product.thumbnail;
                }
            }
            return product;
        }
        catch (err) {
            console.log('Error al guardar: ', err);
        }
    }

    getById(id) {
        try {
            if (this.products.length !== 0) {
                const product = this.products.find(x => x.id === id);
                if (product !== undefined) {
                    return product;
                } else {
                    return null;
                }
            } else {
                return null;
            }
        }
        catch (err) {
            console.log('Error de lectura: ', err);
        }
    }

    getAll() {
        try {
           if(this.products.length > 0){      
                return this.products;
           }else{
                return null;
           }
        }
        catch (err) {
            console.log('Error de lectura: ', err);
        }
    }

    deleteById(id) {
        try {
            if(this.products.length === 0){
                return;
            }
            this.products = this.products.filter(function (x) {
                return x.id !== id;
            });
        }
        catch (err) {
            console.log('Error de lectura: ', err);
        }
    }

    deleteAll() {
        try {
            this.products = [];
        }
        catch (err) {
            console.log('Error de lectura: ', err);
        }
    }
}

//Clase Productos.
class Products {
    //Constructor clase Productos.
    constructor(id, title, price, thumbnail) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
    }
}

const obj = new Container();

module.exports =
{
    Products,
    Container,
    obj
}
