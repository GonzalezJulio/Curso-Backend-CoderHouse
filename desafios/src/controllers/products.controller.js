const product = [];

export const GETALLProduct = async (req, re) => {
    res.send({ result: prodcut })
}


export const GETProductById =  async (req, res) => {
    const product = product.find((product) => product.id === req.params.id)
    res.send({ product })
}

export const POSTProduct = async (req, res) => {
    const { title, description, price, thumbnail, code, stock, category } = req.body
    product.push({ title, description, price, thumbnail, code, stock, category })
}