// src/validators/instrument.validator.js
const { param, body } = require('express-validator');

const createInstrumentValidator = [
  body('name').isString().withMessage('El nombre es requerido y debe ser una cadena'),
  body('description').isString().withMessage('La descripción es requerida y debe ser una cadena'),
  body('images').isArray().withMessage('Las imágenes son requeridas y deben ser un array'),
  body('threeD').isArray().withMessage('El campo 3D es requerido y debe ser un array de cadenas')
];

const instrumentInParams = [
  param('id').isMongoId().withMessage('ID del instrumento es inválido'),
];

module.exports = {
  createInstrumentValidator,
  instrumentInParams,
};
