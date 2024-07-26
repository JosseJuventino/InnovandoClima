// src/controllers/instrument.controller.js
const httpError = require('http-errors');
const Instrument = require('../models/instrument.model');
const Station = require('../models/station.model');

const createInstrument = async (req, res, next) => {
  try {
    const { name, description, images, threeD } = req.body;

    const newInstrument = new Instrument({ name, description, images, threeD });
    const createdInstrument = await newInstrument.save();

    res.status(201).json(createdInstrument);
  } catch (error) {
    next(error);
  }
};

const getInstrumentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const instrument = await Instrument.findById(id);
    if (!instrument) throw httpError(404, 'Instrumento no encontrado');
    res.status(200).json({ data: instrument });
  } catch (err) {
    next(err);
  }
};

const getAllInstruments = async (req, res, next) => {
  try {
    const instruments = await Instrument.find();
    if (!instruments) throw httpError(404, 'Instrumentos no encontrados');
    res.status(200).json({ data: instruments });
  } catch (err) {
    next(err);
  }
};

const updateInstrumentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, images, threeD } = req.body;

    const updatedInstrument = await Instrument.findByIdAndUpdate(
      id,
      { name, description, images, threeD },
      { new: true }
    );

    if (!updatedInstrument) {
      throw httpError(404, 'Instrumento no encontrado');
    }

    res.status(200).json({ data: updatedInstrument });
  } catch (err) {
    next(err);
  }
};
const getInstrumentsByStation = async (req, res, next) => {
  try {
    const { stationId } = req.params;
    const station = await Station.findById(stationId).populate('instruments.instrumentId');

    if (!station) {
      throw httpError(404, 'Station not found');
    }

    res.status(200).json({ data: station.instruments });
  } catch (err) {
    next(err);
  }
};

const deleteInstrumentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedInstrument = await Instrument.findByIdAndDelete(id);
    if (!deletedInstrument) throw httpError(404, 'Instrumento no encontrado');
    res.status(200).json({ data: deletedInstrument });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createInstrument,
  getInstrumentById,
  getAllInstruments,
  updateInstrumentById,
  deleteInstrumentById,
  getInstrumentsByStation
};
