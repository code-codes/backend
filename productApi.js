const exp = require('express')
const productApp = exp.Router();
productApp.use(exp.json())

productApp.get('/getproducts', (request, response) => {
    response.send({
        message: "all products"
    })
})

productApp.get('/getproduct/:id', (request, response) => {
    response.send({
        message: `product with id ${request.params.id}`
    })
})

productApp.post('/create-product', (request, response) => {
    response.send({
        message: "product is created"
    })
})

module.exports = productApp
