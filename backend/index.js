const express = require('express')
const app = express()
const host = '0.0.0.0'
const port = 1337

app.get('/', (req, res) => {
    res.send('Hello World from torii-backend!')
})

app.listen(port, host, () => {
    console.log(`Example app listening at http://${host}:${port}`)
})
