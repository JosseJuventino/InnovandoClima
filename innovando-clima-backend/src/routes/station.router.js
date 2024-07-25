// src/routes/station.router.js
const express = require('express');
const router = express.Router();

const {
  createStation,
  getAllStations,
  getStationById,
  updateStationById,
  deleteStationById,
} = require('../controllers/station.controller');

const {
  stationInParams,
  createStationValidator,
} = require('../validator/station.validator');

const { runValidation } = require('../middlewares/validator.middleware');

router.post('/', createStationValidator, runValidation, createStation);
router.get('/', getAllStations);
router.get('/:id', stationInParams, runValidation, getStationById);
router.put('/:id', stationInParams, runValidation, updateStationById);
router.delete('/:id', stationInParams, runValidation, deleteStationById);

module.exports = router;
