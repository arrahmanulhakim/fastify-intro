const { addUserOptions } = require('./options')
const { getUserById, getUsers } = require('./handlers')
const handler = (app, opts, done) => {

    app.get('/getUsers', getUsers)
    // app.get('/getUsersByCountry', (request, reply) => {
    //     const { country } = request.query

    //     if (!country) return users

    //     const fitleredUsersByCountry = users.filter((user) => user.country.toLowerCase() == country.toLowerCase())

    //     return fitleredUsersByCountry
<<<<<<< HEAD
    // })
    app.get('/getUser/:id', getUserById)
    app.post('/addUser', addUserOptions)
=======


    // }) testtbros




    app.get('/getUser/:id', (request, reply) => {
        const id = parseInt(request.params.id, 10)

        const user = users.find((user) => user.id == id)
        return user || reply.status(404).send({
            msg: "User not found",
        })
    })



    // domain.com/getUsers?gender=male <== query parameter
    // twiter.com/userName <== path/dynamic parameter


    app.post('/addUser', addUserOptions, (request) => {
        const id = users.length + 1

        const newUser = { ...request.body, id }
        users.push(newUser)

        return newUser
    })
>>>>>>> c583b1f6cbe875551867ac0404dd20bf443ee8d0

    done()
}

module.exports = handler