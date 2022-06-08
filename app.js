//create express app
//here exp has imported as function, we can check this by logging
//const { response } = require('express');
//const { request } = require('express');
const exp = require('express')
//express object is reffered by a common name called app
//this express module internally contains http server
const app = exp()
//this converts data from client server from json object to js
//has to be wriiten after express object

//import files
const userApp = require('./APIS/userApi')
const productApp = require('./APIS/productApi')

app.use('/user-api', userApp)
app.use('/product-api', productApp)

app.use((request, response, next) => {
    response.send(
        {message: `path ${request.url} is invalid`}
    )
})

app.use((error, request, response, next) => {
    response.send(
        {
            message: "Error occured",
            reason: `${error.message}`
        }
    )
})

app.listen(4000, () => console.log('Server listening to port number 4000'))