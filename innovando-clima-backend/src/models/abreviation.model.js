// src/models/Abbreviation.js
const { Schema, model } = require('mongoose');

const abbreviationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  abbreviation: {
    type: String,
    required: true,
  },
  measure: {
    type: String,
    required: true,
  },
});

module.exports = model('Abbreviation', abbreviationSchema);
