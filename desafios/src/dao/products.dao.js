const product = [];
export const find = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve (product);
        }, 1000)
    })

}
export const findOne = () => {
    const product = product.find((product) => product.id === req.params.id);
    return product;

}
export const create = (data) => {
    product.push({ ...data })
}