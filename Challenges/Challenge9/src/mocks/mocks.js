const {faker} = require('@faker-js/faker');

export default class Mocks {

    constructor(count) {
        this.count = count;
    }
    mockProducts() {
        const products = [];
        
        for (let i = 0; i < this.count; i++) {
            const product = {
                id: faker.datatype.uuid(),
                title: faker.commerce.product(),
                price: faker.datatype.number({min: 10000, max: 100000}),
                image: faker.image.imageUrl(40, 40, 'car', true)
            }
            products.push(product);        
        }
        return products;
    }
}