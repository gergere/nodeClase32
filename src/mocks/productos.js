
import faker from 'faker'
faker.locale = 'es'

function createNFakeProducts(n) {
    const result = [];
    for (let i = 0; i < n; i++) {
        const fake = createFakeProduct(i);
        result.push(fake);
    }
    return result;
}

function createFakeProduct(id) {
    const fkr = {
        id,
        title: faker.commerce.product(),
        price: faker.commerce.price(),
        thumbnail: faker.image.imageUrl()
    }
    return fkr;
}

export {
    createFakeProduct,
    createNFakeProducts
}