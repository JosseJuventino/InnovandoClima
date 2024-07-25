// src/controllers/station.controller.js
const httpError = require('http-errors');
const Station = require('../models/station.model');

const createStation = async (req, res, next) => {
  try {
    const { name, location, images, instruments, stationNumber } = req.body;

    const existingStation = await Station.findOne({ stationNumber });
    if (existingStation) {
      return res.status(400).json({ error: 'Ya existe una estación con este número.' });
    }

    const newStation = new Station({ name, location, images, instruments, stationNumber });
    const createdStation = await newStation.save();

    res.status(201).json(createdStation);
  } catch (error) {
    next(error);
  }
};

const getStationById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const station = await Station.findById(id).populate('instruments');
    if (!station) throw httpError(404, 'Estación no encontrada');
    res.status(200).json({ data: station });
  } catch (err) {
    next(err);
  }
};

const getAllStations = async (req, res, next) => {
  try {
    const stations = await Station.find().populate('instruments');
    if (!stations) throw httpError(404, 'Estaciones no encontradas');
    res.status(200).json({ data: stations });
  } catch (err) {
    next(err);
  }
};

const updateStationById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, location, images, instruments, stationNumber } = req.body;

    const updatedStation = await Station.findByIdAndUpdate(
      id,
      { name, location, images, instruments, stationNumber },
      { new: true }
    );

    if (!updatedStation) {
      throw httpError(404, 'Estación no encontrada');
    }

    res.status(200).json({ data: updatedStation });
  } catch (err) {
    next(err);
  }
};

const deleteStationById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedStation = await Station.findByIdAndDelete(id);
    if (!deletedStation) throw httpError(404, 'Estación no encontrada');
    res.status(200).json({ data: deletedStation });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createStation,
  getStationById,
  getAllStations,
  updateStationById,
  deleteStationById,
};
