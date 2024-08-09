const debug = require("debug")("marn-api:db"); // improtando debug

const mongoose = require("mongoose"); //importando mongoose

const envconfig = require("./env.config");
const uri = envconfig.MONGO_URI;

//Conectando a la base de datos
const connect = async () => {
  try {
    await mongoose.connect(uri);
    debug("Connected successfully to database!");
  } catch (error) {
    debug("[Error]: Can't connect to databa!");
  }
};

module.exports = { connect };
