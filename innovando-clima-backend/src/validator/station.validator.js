// src/validators/station.validator.js
const { param, body } = require('express-validator');

const createStationValidator = [
  body('name').isString().withMessage('El nombre es requerido y debe ser una cadena'),
  body('location').isArray({ min: 2, max: 2 }).withMessage('La ubicación es requerida y debe ser un array de dos números'),
  body('images').isArray().withMessage('Las imágenes son requeridas y deben ser un array'),
  body('instruments').isArray().withMessage('Los instrumentos son requeridos y deben ser un array de IDs'),
  body('stationNumber').isInt().withMessage('El número de estación es requerido y debe ser un número entero')
];

const stationInParams = [
  param('id').isMongoId().withMessage('ID de la estacion inválido'),
];

module.exports = {
  createStationValidator,
  stationInParams,
};
