const fastify = require('fastify')

const Ajv = require('ajv')

const app = fastify({ logger: true })

const ajv = new Ajv({
    removeAdditional: 'all',
    coerceTypes: false,
})
app.setValidatorCompiler(({ schema, method, url, httpPart }) => {
    return ajv.compile(schema)
})


app.register(require('@fastify/formbody')) // <== fastify-formbody is deprecatedd

app.register(require('./routers'), {
    prefix: '/api',
})

const PORT = process.env.PORT || 8000

app.listen(PORT).catch((error) => {
    app.log.error(error)
    process.exit()
})
