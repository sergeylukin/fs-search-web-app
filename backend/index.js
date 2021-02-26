const express = require('express')
const app = express()
const glob = require('glob');

const host = '0.0.0.0'
const port = 1337

app.get('/', (req, res) => {
    res.send('Hello World from torii-backend!')
})

app.get('/search', (req, res) => {
   const searchQuery = req.query._q
   glob('/filesystem/' + searchQuery, {}, (err, files) => {
       if (files.length === 0) {
         res.status(404).send(`Not found`)
       }
       files.forEach((val, index) => files[index] = files[index].replace(`/filesystem/`, `/`))
       res.send(files)
   })
});

app.listen(port, host, () => {
    console.log(`Example app listening at http://${host}:${port}`)
})
