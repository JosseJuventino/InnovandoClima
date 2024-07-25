// src/validators/abbreviation.validator.js
const { param, body } = require('express-validator');

const createAbbreviationValidator = [
  body('name').isString().withMessage('El nombre es requerido y debe ser una cadena'),
  body('abbreviation').isString().withMessage('La abreviatura es requerida y debe ser una cadena'),
  body('measure').isString().withMessage('La medida es requerida y debe ser una cadena'),
];

const abbreviationInParams = [
  param('id')
    .notEmpty()
    .withMessage('El ID de la abreviacion es requerido')
    .isMongoId()
    .withMessage('El ID debe ser un ID de MongoDB válido'),
];

const abbreviationInParamsByAbbreviation = [
  param('abbreviation')
    .notEmpty()
    .withMessage('La abreviatura es requerida')
    .isString()
    .withMessage('La abreviatura debe ser una cadena de texto')
];

module.exports = {
  abbreviationInParams,
  createAbbreviationValidator,
  abbreviationInParamsByAbbreviation
};
