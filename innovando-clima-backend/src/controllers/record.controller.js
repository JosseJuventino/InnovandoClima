const moment = require('moment-timezone');
const httpError = require('http-errors');
const Record = require('../models/record.model');
const Abbreviation = require('../models/abreviation.model'); 

const createRecord = async (req, res, next) => {
  try {
    const { abbreviationId, stationId, day, time, measurement } = req.body;

    const newRecord = new Record({ 
      abbreviationId, 
      stationId, 
      day: day || new Date(), 
      time: time || new Date().toLocaleTimeString('en-US', { hour12: false }), 
      measurement 
    });
    const createdRecord = await newRecord.save();

    res.status(201).json(createdRecord);
  } catch (error) {
    next(error);
  }
};

const getRecordById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const record = await Record.findById(id).populate('abbreviationId stationId');
    if (!record) throw httpError(404, 'Registro no encontrado');
    res.status(200).json({ data: record });
  } catch (err) {
    next(err);
  }
};

const getAllRecords = async (req, res, next) => {
  try {
    const records = await Record.find().populate('abbreviationId stationId');
    if (!records) throw httpError(404, 'Registros no encontrados');
    res.status(200).json({ data: records });
  } catch (err) {
    next(err);
  }
};

const updateRecordById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { abbreviationId, stationId, day, time, measurement } = req.body;

    const updatedRecord = await Record.findByIdAndUpdate(
      id,
      { abbreviationId, stationId, day, time, measurement },
      { new: true }
    );

    if (!updatedRecord) {
      throw httpError(404, 'Registro no encontrado');
    }

    res.status(200).json({ data: updatedRecord });
  } catch (err) {
    next(err);
  }
};

const deleteRecordById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedRecord = await Record.findByIdAndDelete(id);
    if (!deletedRecord) throw httpError(404, 'Registro no encontrado');
    res.status(200).json({ data: deletedRecord });
  } catch (err) {
    next(err);
  }
};

const getLatestRecordsByStation = async (req, res, next) => {
  try {
    const { stationId } = req.params;
    const abbreviations = await Abbreviation.find();

    // Define the timezone for El Salvador
    const timeZone = 'America/El_Salvador';
    const today = moment.tz(timeZone).format('YYYY-MM-DD'); // Formatted date string for today in El Salvador

    const results = {};
    let latestRecordsInfo = [];

    for (const abbreviation of abbreviations) {
      const records = await Record.find({
        stationId,
        abbreviationId: abbreviation._id,
        day: {
          $gte: new Date(`${today}T00:00:00Z`),  // Start of the day in UTC
          $lte: new Date(`${today}T23:59:59Z`)   // End of the day in UTC
        }
      });

      if (records.length > 0) {
        // Ordenar registros por `time` en orden ascendente
        records.sort((a, b) => a.time.localeCompare(b.time));
        const latestRecord = records[records.length - 1];
        results[abbreviation.abbreviation] = latestRecord.measurement;
        latestRecordsInfo.push({ abbreviation: abbreviation.abbreviation, time: latestRecord.time });
      } else {
        results[abbreviation.abbreviation] = "";
      }
    }

    res.status(200).json({
      data: results,
      recordInfo: {
        date: today,
        times: latestRecordsInfo
      }
    });
  } catch (err) {
    next(err);
  }
};


const getRecordsByStationAndDate = async (req, res, next) => {
  try {
    const { stationId, date } = req.params;

    // Asegurarse de que la fecha tenga el formato correcto
    const formattedDate = new Date(`${date}T00:00:00.000Z`);

    const startOfDay = new Date(formattedDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(formattedDate);
    endOfDay.setHours(23, 59, 59, 999);

    // Obtener todas las abreviaturas
    const abbreviations = await Abbreviation.find();

    // Buscar registros dentro del rango de fecha
    const records = await Record.find({
      stationId,
      day: { $gte: startOfDay, $lte: endOfDay }
    }).populate('abbreviationId stationId');

    // Agrupar registros por abreviatura
    const results = abbreviations.reduce((acc, abbreviation) => {
      const filteredRecords = records.filter(record => record.abbreviationId._id.equals(abbreviation._id));
      acc[abbreviation.abbreviation] = filteredRecords.length > 0 ? filteredRecords.map(record => ({
        time: record.time,
        measurement: record.measurement
      })) : [{ time: "", measurement: "" }];
      return acc;
    }, {});

    res.status(200).json({ data: results });
  } catch (err) {
    next(err);
  }
};

const getRecordsByStationDateAndAbbreviation = async (req, res, next) => {
  try {
    const { stationId, date, abbreviation } = req.params;

    // Asegurarse de que la fecha tenga el formato correcto
    const formattedDate = new Date(`${date}T00:00:00.000Z`);

    const startOfDay = new Date(formattedDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(formattedDate);
    endOfDay.setHours(23, 59, 59, 999);

    // Obtener la abreviatura especificada
    const abbreviationData = await Abbreviation.findOne({ abbreviation });
    if (!abbreviationData) {
      return res.status(404).json({ error: 'Abreviatura no encontrada' });
    }

    // Buscar registros dentro del rango de fecha para la abreviatura específica
    const records = await Record.find({
      stationId,
      day: { $gte: startOfDay, $lte: endOfDay },
      abbreviationId: abbreviationData._id
    }).populate('abbreviationId stationId');

    // Formatear la respuesta con los registros encontrados
    const results = records.length > 0 ? records.map(record => ({
      time: record.time,
      measurement: record.measurement
    })) : [{ time: "", measurement: "" }];

    res.status(200).json({ data: { [abbreviation]: results } });
  } catch (err) {
    next(err);
  }
};

const getRecordsByStationAndDateRange = async (req, res, next) => {
  try {
    const { stationId } = req.params;
    const { startDate, endDate, abbreviation } = req.query;

    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    let abbreviationFilter = {};
    if (abbreviation) {
      const abbreviationData = await Abbreviation.findOne({ abbreviation });
      if (abbreviationData) {
        abbreviationFilter = { abbreviationId: abbreviationData._id };
      } else {
        return res.status(404).json({ error: 'Abreviatura no encontrada' });
      }
    }

    // Filtrar registros por estación, rango de fechas y abreviatura (si se proporciona)
    const records = await Record.find({
      stationId,
      day: { $gte: start, $lte: end },
      ...abbreviationFilter
    }, 'day time measurement abbreviationId') // Proyectar solo los campos necesarios
    .populate('abbreviationId', 'abbreviation');

    // Agrupar registros por día y hora
    const results = records.reduce((acc, record) => {
      const day = record.day.toISOString().split('T')[0]; // Obtener solo la fecha
      if (!acc[day]) acc[day] = {};
      
      const time = record.time;
      if (!acc[day][time]) acc[day][time] = [];

      acc[day][time].push({
        measurement: record.measurement,
        abbreviation: record.abbreviationId.abbreviation
      });
      
      return acc;
    }, {});

    res.status(200).json({ data: results });
  } catch (err) {
    next(err);
  }
};

const getRecordsByStationAndDateRangeAllAbbreviations = async (req, res, next) => {
  try {
    const { stationId } = req.params;
    const { startDate, endDate } = req.query;

    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    // Fetch all abbreviations
    const abbreviations = await Abbreviation.find();

    // Initialize the result data object
    const results = {};

    // Loop through each abbreviation to fetch records
    for (const abbr of abbreviations) {
      const records = await Record.find({
        stationId,
        day: { $gte: start, $lte: end },
        abbreviationId: abbr._id
      }, 'day time measurement abbreviationId')
      .populate('abbreviationId', 'abbreviation');

      // Organize records by abbreviation and date
      const abbrData = records.reduce((acc, record) => {
        const day = record.day.toISOString().split('T')[0]; // Extract the date part
        if (!acc[day]) acc[day] = {};
        const time = record.time;
        acc[day][time] = {
          measurement: record.measurement,
          abbreviation: record.abbreviationId.abbreviation
        };
        return acc;
      }, {});

      results[abbr.abbreviation] = abbrData;
    }

    res.status(200).json({ data: results });
  } catch (error) {
    console.error('Error fetching records:', error);
    next(error);
  }
};



module.exports = {
  createRecord,
  getRecordById,
  getAllRecords,
  updateRecordById,
  deleteRecordById,
  getLatestRecordsByStation,
  getRecordsByStationAndDate,
  getRecordsByStationDateAndAbbreviation,
  getRecordsByStationAndDateRange,
  getRecordsByStationAndDateRangeAllAbbreviations
};
