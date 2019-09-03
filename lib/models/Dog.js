const mongoose = require('mongoose');

const DogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 20
  },
  age: {
    type: Number,
    required: true
  },
  weight: Number
});

module.exports = mongoose.model('Dog', DogSchema);
