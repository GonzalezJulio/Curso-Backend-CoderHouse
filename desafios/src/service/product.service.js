import * as productDAO from '../dao/products.dao.js'

export const GETALLProduct = async () => {
    return await productDAO.find()
}

export const GETProductById = async (id) => {
    const product = productDAO.findOne(id);
    if(!product) {
        throw new Error('No Product Found');
    }
    return product;
}
// (title, description, price, thumbnail, code, stock, category)
export const POSTProduct = async (data) => {
    if (data.title == "" || data.description == "" || data.price == "" || data.code == '' || data.stock == '' || data.category == '')
    throw new Error('Formulario Invalido')
    return productDAO.create(data);
}