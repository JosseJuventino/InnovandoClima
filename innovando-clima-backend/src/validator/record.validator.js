const { param, body } = require('express-validator');

const createRecordValidator = [
  body('abbreviationId').isMongoId().withMessage('El ID de la abreviación es requerido y debe ser un ID válido'),
  body('stationId').isMongoId().withMessage('El ID de la estación es requerido y debe ser un ID válido'),
  body('day').optional().isISO8601().toDate().withMessage('El día debe ser una fecha válida'),
  body('time').optional().isString().withMessage('La hora debe ser una cadena'),
  body('measurement').isString().withMessage('La medición es requerida y debe ser una cadena')
];

const recordInParams = [
  param('id').optional().isMongoId().withMessage('ID inválido'),
  param('stationId').optional().isMongoId().withMessage('ID de estación inválido')
];

const getRecordsByStationDateAbbreviationValidator = [
  param('stationId').isMongoId().withMessage('El ID de la estación es requerido y debe ser un ID válido'),
  param('date').isISO8601().withMessage('La fecha es requerida y debe estar en formato ISO8601'),
  param('abbreviation').isString().withMessage('La abreviatura es requerida y debe ser una cadena')
];

module.exports = {
  createRecordValidator,
  recordInParams,
  getRecordsByStationDateAbbreviationValidator,
};
