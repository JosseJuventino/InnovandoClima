const express = require('express');
const router = express.Router();

const abbreviationRouter = require('./abreviation.router');
const instrumentRouter = require('./instrument.router');

router.use('/abbreviations', abbreviationRouter);
router.use('/instruments', instrumentRouter);

module.exports = router;
