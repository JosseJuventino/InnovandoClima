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
      instrumentId: {
        type: Schema.Types.ObjectId,
        ref: 'Instrument',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      }
    }
  ],
  stationNumber: {
    type: Number,
    required: true,
    unique: true,
  },
});

module.exports = model('Station', stationSchema);
