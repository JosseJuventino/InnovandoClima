const debug = require("debug")("marn-api:db"); // improtando debug

const mongoose = require("mongoose"); //importando mongoose

const envconfig = require("./env.config");
const uri = envconfig.MONGO_URI;

//Conectando a la base de datos
const connect = async () => {
  try {
    await mongoose.connect(uri);
    debug("Estas conectado a la BD!");
  } catch (error) {
    debug("[Error]: Can't ;/!");
  }
};

module.exports = { connect };
