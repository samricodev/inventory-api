const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000

mongoose.connect("mongodb://db:27017/inventory",
  {
      useNewUrlParser: true,
      useUnifiedTopology: true

  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err)
);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`)
})