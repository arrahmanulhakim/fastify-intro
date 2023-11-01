const { addUserOptions } = require('./options')
const { getUserById, getUsers } = require('./handlers')
const handler = (app, opts, done) => {

    app.get('/getUsers', getUsers)
    // app.get('/getUsersByCountry', (request, reply) => {
    //     const { country } = request.query

    //     if (!country) return users

    //     const fitleredUsersByCountry = users.filter((user) => user.country.toLowerCase() == country.toLowerCase())

    //     return fitleredUsersByCountry
    // })
    app.get('/getUser/:id', getUserById)
    app.post('/addUser', addUserOptions)

    done()
}

module.exports = handler