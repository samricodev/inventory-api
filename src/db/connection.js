const mongoose = require('mongoose')

const connection = () => {
  mongoose.connect("mongodb://db:27017/inventory",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true

    })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err)
    );
}

module.exports = connection