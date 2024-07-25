// src/routes/abbreviation.router.js
const express = require('express');
const router = express.Router();

const {
  createAbbreviation,
  getAllAbbreviations,
  getAbbreviationById,
  updateAbbreviationById,
  deleteAbbreviationById,
  getAbbreviationByAbbreviation
} = require('../controllers/abreviation.controller');

const {
  abbreviationInParams,
  createAbbreviationValidator,
  abbreviationInParamsByAbbreviation, 
} = require('../validator/abreviation.validator');

const { runValidation } = require('../middlewares/validator.middleware');

router.post('/', createAbbreviationValidator, runValidation, createAbbreviation);
router.get('/', getAllAbbreviations);
router.get('/:id', abbreviationInParams, runValidation, getAbbreviationById);
router.put('/:id', abbreviationInParams, runValidation, updateAbbreviationById);
router.delete('/:id', abbreviationInParams, runValidation, deleteAbbreviationById);
router.get('/abbreviation/:abbreviation', abbreviationInParamsByAbbreviation, runValidation, getAbbreviationByAbbreviation);

module.exports = router;
