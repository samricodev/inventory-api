const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/gay', (req, res) => {
  res.send('Hello gayx2!')
})

app.get('/botello', (req, res) => {
  res.send('Hola me gusta la ñonga')
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})