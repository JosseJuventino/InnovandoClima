const express = require('express');
const router = express.Router();

const abbreviationRouter = require('./abreviation.router');
const instrumentRouter = require('./instrument.router');
const stationRouter = require('./station.router');
const recordRouter = require('./record.router');

router.use('/abbreviations', abbreviationRouter);
router.use('/instruments', instrumentRouter);
router.use('/stations', stationRouter);
router.use('/records', recordRouter);

module.exports = router;
