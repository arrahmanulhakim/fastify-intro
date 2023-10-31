const users = require('./users.json')

const addUserOptions = {
    schema: {
        body: {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                },
                age: {
                    type: ['number', 'string'],
                },
                gender: {
                    type: 'string',
                    enum: ['male', 'female', 'others'],
                },
            },
            required: ['name', 'gender'],
            //additionalProperties: false,
        }
    }
}

const handler = (app, opts, done) => {

    app.get('/getUsers', (request, reply) => {
        const { gender, country } = request.query // <== query parameter


        if (!gender && !country) return users

        let filteredUsers = users;

        if (gender) {
            filteredUsers = users.filter((user) => user.gender.toLowerCase() == gender.toLowerCase())
        }
        if (country) {
            filteredUsers = users.filter((user) => user.country.toLowerCase() == country.toLowerCase())
        }
        return filteredUsers
    })

    // app.get('/getUsersByCountry', (request, reply) => {
    //     const { country } = request.query

    //     if (!country) return users

    //     const fitleredUsersByCountry = users.filter((user) => user.country.toLowerCase() == country.toLowerCase())

    //     return fitleredUsersByCountry


    // })




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

    done()
}

module.exports = handler