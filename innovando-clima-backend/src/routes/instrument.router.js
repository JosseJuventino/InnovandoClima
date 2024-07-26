// src/routes/instrument.router.js
const express = require('express');
const router = express.Router();

const {
  createInstrument,
  getAllInstruments,
  getInstrumentById,
  updateInstrumentById,
  deleteInstrumentById,
  getInstrumentsByStation
} = require('../controllers/instrument.controller');

const {
  instrumentInParams,
  createInstrumentValidator,
} = require('../validator/instrument.validator');

const { runValidation } = require('../middlewares/validator.middleware');

router.post('/', createInstrumentValidator, runValidation, createInstrument);
router.get('/', getAllInstruments);
router.get('/:id', instrumentInParams, runValidation, getInstrumentById);
router.put('/:id', instrumentInParams, runValidation, updateInstrumentById);
router.delete('/:id', instrumentInParams, runValidation, deleteInstrumentById);
router.get('/station/:stationId', runValidation, getInstrumentsByStation);

module.exports = router;
