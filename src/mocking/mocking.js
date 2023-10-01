import { faker } from '@faker-js/faker';
import { randProductCategory } from '@ngneat/falso'

const ProductMocking = async (quantity) => {
    const products = [];
    for (let i = 0; i < quantity; i++) {
        const viewsProducts = {
            _id: faker.database.mongodbObjectId(),
            title: faker.commerce.productName(),
            category: randProductCategory(),
            description: faker.commerce.productDescription(),
            price: faker.commerce.price({ min: 2, max: 10000 }),
            code: faker.number.hex({ min: 0, max: 9999 }),
            stock: faker.number.int({ min: 15, max: 30 })
        }
        products.push(viewsProducts)
    }
    console.log(products)
    return products
}

export default ProductMocking