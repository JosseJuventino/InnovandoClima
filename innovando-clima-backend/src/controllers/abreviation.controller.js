// src/controllers/abbreviation.controller.js
const httpError = require('http-errors');
const Abbreviation = require('../models/abreviation.model');

// Crear una nueva abreviatura
const createAbbreviation = async (req, res, next) => {
  try {
    const { name, abbreviation, measure } = req.body;

    // Comprobar si ya existe una abreviatura con el mismo nombre
    const existingAbbreviation = await Abbreviation.findOne({ abbreviation });
    if (existingAbbreviation) {
      return res.status(400).json({ error: 'Ya existe una abreviatura con este nombre.' });
    }

    // Crear un nuevo objeto Abbreviation
    const newAbbreviation = new Abbreviation({
      name,
      abbreviation,
      measure,
    });

    // Guardar el nuevo objeto Abbreviation en la base de datos
    const createdAbbreviation = await newAbbreviation.save();

    // Devolver una respuesta de éxito con el objeto Abbreviation creado
    res.status(201).json(createdAbbreviation);
  } catch (error) {
    next(error);
  }
};

// Obtener una abreviatura por ID
const getAbbreviationById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const abbreviation = await Abbreviation.findById(id);
    if (!abbreviation) throw httpError(404, 'Abreviatura no encontrada');
    res.status(200).json({ data: abbreviation });
  } catch (err) {
    next(err);
  }
};

// Obtener todas las abreviaturas
const getAllAbbreviations = async (req, res, next) => {
  try {
    const abbreviations = await Abbreviation.find();
    if (!abbreviations) throw httpError(404, 'Abreviaturas no encontradas');
    res.status(200).json({ data: abbreviations });
  } catch (err) {
    next(err);
  }
};

// Actualizar una abreviatura por ID
const updateAbbreviationById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, abbreviation, measure } = req.body;

    const updatedAbbreviation = await Abbreviation.findByIdAndUpdate(
      id,
      { name, abbreviation, measure },
      { new: true }
    );

    if (!updatedAbbreviation) {
      throw httpError(404, 'Abreviatura no encontrada');
    }

    res.status(200).json({ data: updatedAbbreviation });
  } catch (err) {
    next(err);
  }
};

// Eliminar una abreviatura por ID
const deleteAbbreviationById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedAbbreviation = await Abbreviation.findByIdAndDelete(id);
    if (!deletedAbbreviation) throw httpError(404, 'Abreviatura no encontrada');
    res.status(200).json({ data: deletedAbbreviation });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createAbbreviation,
  getAbbreviationById,
  getAllAbbreviations,
  updateAbbreviationById,
  deleteAbbreviationById,
};
