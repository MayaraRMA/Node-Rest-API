'use strict'

let app = require('./config/custom-express')()

const port = normalizePort(process.env.PORT || '3000')

app.listen(port, function() {
    console.log(`'Message RESTful API server started on: ${port}`)
});

function normalizePort(val) {
    const port = parseInt(val, 10)

    if (isNaN(port)) {
        return val
    }

    if (port >= 0) {
        return port
    }

    return false
}