// src/models/Instrument.js
const { Schema, model } = require('mongoose');

const instrumentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String,
      required: true,
    }
  ],
  threeD: [
    {
      type: String,
      required: true,
    }
  ],
});

module.exports = model('Instrument', instrumentSchema);
