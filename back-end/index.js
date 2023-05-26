const express = require('express')


const server = express()


// Server Setup
const port = process.env.PORT || 8000
server.listen(port, () => {
    console.log(`Server listening on: ${port}`)
})