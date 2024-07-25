// src/models/record.model.js
const { Schema, model } = require('mongoose');

const recordSchema = new Schema({
  abbreviationId: {
    type: Schema.Types.ObjectId,
    ref: 'Abbreviation',
    required: true,
  },
  stationId: {
    type: Schema.Types.ObjectId,
    ref: 'Station',
    required: true,
  },
  day: {
    type: Date,
    default: Date.now,
  },
  time: {
    type: String,
    default: () => new Date().toLocaleTimeString('en-US', { hour12: false }),
  },
  measurement: {
    type: String,
    required: true,
  },
});

module.exports = model('Record', recordSchema);
