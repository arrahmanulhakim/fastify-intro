const users = require('./users.json')

const getUsers = (request, reply) => {
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
}

const getUserById = (request, reply) => {
    const id = parseInt(request.params.id, 10)

    const user = users.find((user) => user.id == id)
    return (
        user || reply.status(404).send({
            msg: "User not found",
        })
    )
}

const addUser = (request) => {
    const id = users.length + 1

    const newUser = { ...request.body, id }
    users.push(newUser)

    return newUser
}

module.exports = { getUsers, getUserById, addUser }