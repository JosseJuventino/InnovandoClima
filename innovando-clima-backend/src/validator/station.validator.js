const { param, body } = require('express-validator');

const createStationValidator = [
  body('name').isString().withMessage('El nombre es requerido y debe ser una cadena'),
  body('location').isArray({ min: 2, max: 2 }).withMessage('La ubicación es requerida y debe ser un array de dos números'),
  body('images').isArray().withMessage('Las imágenes son requeridas y deben ser un array'),
  body('instruments').isArray().withMessage('Los instrumentos son requeridos y deben ser un array'),
  body('instruments.*.instrumentId').isMongoId().withMessage('El ID del instrumento debe ser un ID válido de MongoDB'),
  body('instruments.*.quantity').isInt({ min: 1 }).withMessage('La cantidad de cada instrumento debe ser un número entero mayor que 0'),
  body('stationNumber').isInt().withMessage('El número de estación es requerido y debe ser un número entero')
];

const stationInParams = [
  param('id').isMongoId().withMessage('ID de la estación inválido'),
];

module.exports = {
  createStationValidator,
  stationInParams,
};
