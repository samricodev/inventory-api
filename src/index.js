const express = require('express')
const connection = require('./db/connection')
const app = express()
const port = 3000

connection()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`)
})