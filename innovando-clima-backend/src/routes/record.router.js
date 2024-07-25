// src/routes/record.router.js
const express = require('express');
const router = express.Router();

const {
  createRecord,
  getAllRecords,
  getRecordById,
  updateRecordById,
  deleteRecordById,
  getLatestRecordsByStation,
  getRecordsByStationAndDate,
  getRecordsByStationDateAndAbbreviation,
  getRecordsByStationAndDateRange,
  getRecordsByStationAndDateRangeAllAbbreviations
} = require('../controllers/record.controller');

const {
  recordInParams,
  createRecordValidator,
   getRecordsByStationDateAbbreviationValidator,
} = require('../validator/record.validator');

const { runValidation } = require('../middlewares/validator.middleware');

router.post('/', createRecordValidator, runValidation, createRecord);
router.get('/', getAllRecords);
router.get('/:id', recordInParams, runValidation, getRecordById);
router.put('/:id', recordInParams, runValidation, updateRecordById);
router.delete('/:id', recordInParams, runValidation, deleteRecordById);
router.get('/latest/:stationId', recordInParams, runValidation, getLatestRecordsByStation);
router.get('/station/:stationId/date/:date', getRecordsByStationAndDate);
router.get('/station/:stationId/date/:date/abbreviation/:abbreviation', getRecordsByStationDateAbbreviationValidator, runValidation, getRecordsByStationDateAndAbbreviation);
router.get('/station/:stationId/range', getRecordsByStationAndDateRange);
router.get('/station/:stationId/all-abbreviations', getRecordsByStationAndDateRangeAllAbbreviations);


module.exports = router;
