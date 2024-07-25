// src/models/Station.js
const { Schema, model } = require('mongoose');

const stationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: [Number], 
    required: true,
  },
  images: [
    {
      type: String,
      required: true,
    }
  ],
  instruments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Instrument',
      required: true,
    }
  ],
  stationNumber: {
    type: Number,
    required: true,
    unique: true,
  },
});

module.exports = model('Station', stationSchema);
