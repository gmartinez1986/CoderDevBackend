
//Alumno: Gabrial Martinez

//Curso Desarrollo Backend 

//Modulo nativo file system: fs.
const fs = require('fs');

//Clase Contenedor.
class Container {

    //Constructor clase Contenedor.
    constructor(fileName) {
        this.fileName = fileName;
    }

    //Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
    async save(product) {

        try {
            //Busco todo los productos;
            let products = await this.getAll();

            //Si producto es igual a null significa que no existe archivo txt con productos.
            if (products === null) {
                //Asigno el id 1 al primer elemento del nuevo array de productos que voy a guardar en un nuevo txt de productos.
                products = [];
                product.id = 1
                products.push(product);

            } else {
                //Pregunto si el objeto tiene id, si el id esta definido, es una modificación.
                if(product.id === undefined){
                    //En caso de que productos sea distinto de null,
                    //asigno el ultimo a id de la lista a una variable y le sumo 1(uno).
                    let lastId = products[products.length - 1].id;
                    //En nuevo id se lo asigno al nuevo objeto de la lista.
                    product.id = ++lastId;
                    products.push(product);
                }else{
                    //Busco el producto.
                    const editProduct = products.find(prod => prod.id === product.id);
                    //Modifico el producto.
                    editProduct.title = product.title;
                    editProduct.price = product.price;
                    editProduct.thumbnail = product.thumbnail;
                }
            }
            //En caso de que no exista el txt lo creo sino lo sobrescribo con el listado que contiene el nuevo elemento.
            await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(products));

            return product;
        }
        catch (err) {
            console.log('Error al guardar: ', err);
        }
    }

    //Recibe un id y devuelve el objeto con ese id, o null si no esta.
    async getById(id) {
        try {
            //Busco todos los productos en el txt.
            const products = await this.getAll();
            //Si productos es igual a null el metodo devuelve null.
            if (products !== null) {
                //Busco el pruducto a partir de su id.
                const product = products.find(x => x.id === id);
                //Sino encuentro el producto devuelvo null sino devuelvo el objeto.
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

    //Devuelve un array con los objetos presentes en el archivo.
    async getAll() {
        try {
            //Consulto si el txt existe en la ruta designada.
            if (await fs.existsSync(`./${this.fileName}`, 'utf-8')) {
                //En caso de que el txt exista busco los elementos contenidos en el.
                const products = await fs.promises.readFile(`./${this.fileName}`, 'utf-8');

                //Compruebo si el contenido del txt es un json.
                if (await this.isJsonString(products)) {
                    return JSON.parse(products);
                } else {
                    return null;
                }
            } else {
                //Si el txt no existe devuelvo null.
                return null;
            }
        }
        catch (err) {
            console.log('Error de lectura: ', err);
        }
    }

    //Comprueba si la cadena de caracteres se puede transformar en un JSON.
    async isJsonString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    //Elimina del archivo el objeto con el id buscado.
    async deleteById(id) {
        try {
            //Busco todos los productos en el txt.
            let products = await this.getAll();

            //Filtro el objeto que tenga el mismo id que paso por parametro.
            products = products.filter(function (x) {
                return x.id !== id;
            });
            //Piso el archivo txt con el nuevo listado de productos que no incluye el producto que se quiere eliminar.
            await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(products));
        }
        catch (err) {
            console.log('Error de lectura: ', err);
        }

    }

    //Elimina todos los objetos presentes en el archivo.
    async deleteAll() {
        try {
            await fs.promises.writeFile(`./${this.fileName}`, "");
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

module.exports =
{
    Products,
    Container
}
