export default class Products {
    
   /* constructor(id, timestamp, name, description, code, photo, price, stock) {
        this.id = id;
        this.timestamp = timestamp;
        this.name = name;
        this.description = description;
        this.code = code;
        this.photo = photo;
        this.price = price;
        this.stock = stock;
    } */

    constructor(id, title, price, thumbnail) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
    }
}