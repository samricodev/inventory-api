const moongose = require('mongoose');

const CategorySchema = new moongose.Schema({
  name: {
    type: String,
    required: true,
  },
  items: [
    {
      type: moongose.Schema.Types.ObjectId,
      ref: 'Item',
    },
  ],
});

module.exports = moongose.model('Category', CategorySchema);