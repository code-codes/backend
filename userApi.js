const exp = require('express')
const userApp = exp.Router();
userApp.use(exp.json())

//middleware
const middleware1 = (request, response, next) => {
    console.log("Middleware executed");
    next()
}

//call middleware
userApp.use('/getusers', middleware1)

//fake data/api
let users = [
    {
        id: 1,
        name: 'ravi',
        age: 21
    },

    {
        id: 2,
        name: 'madhu',
        age: 23
    }
]

userApp.get('/getusers', (request, response) => {
    response.send({
        message: "all users",
        payload: users
    })
});

userApp.get('/getuser/:id', (request, response) => {
    let userId = (+request.params.id)

    let userObj = users.find(userObj => userObj.id == userId)
    console.log(userObj)

    if(userObj == undefined)
        response.send({
            message: "User not existed"
        })
    else {
        response.send({
            message: "User found",
            payload: userObj
        })
    }
});

userApp.post('/create-user', (request, response) => {
    let newUser = request.body;
    users.push(newUser)
    response.send({
        message: "New user created"
    })
})

userApp.put('/update-user', (request, response) => {
    let modifiedUser = request.body;
    let userObj = users.find(userObj => userObj.id == modifiedUser.id)
    userObj.name = modifiedUser.name
    userObj.age = modifiedUser.age
    response.send({
        message: "User updated",
        payload: userObj
    })
})

userApp.delete('/remove-user/:id', (request, response) => {
    let userId = (+request.params.id)

    let objIndex = users.findIndex(userObj => userObj.id == userId)

    if(objIndex == -1)
        response.send({
            message: "User not existed"
        })
    else {
        users.splice(objIndex, 1);
        response.send({
            message: "User deleted"
        })
    }
});

module.exports = userApp