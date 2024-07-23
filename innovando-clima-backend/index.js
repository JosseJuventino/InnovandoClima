require('dotenv').config();

const envconfig = require('./src/config/env.config');
const database = require('./src/config/db.config');
const mainRouter = require('./src/routes/main.router');
const { errorHandler } = require('./src/middlewares/error.middleware');
const express = require('express');
const debug = require('debug')('css-api:server');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());
app.use('/api/v1', mainRouter);

app.use('/', (req, res) => {
  res.send('Welcome to MARN API');
});

app.use(errorHandler);

const port = envconfig.PORT;

const startServer = () => {
  try {
    database.connect().then(() => {
      console.log('Conectado a la base de datos'); // Mensaje de éxito en la conexión a la base de datos
    }).catch((err) => {
      console.error('Error al conectar a la base de datos:', err);
    });

    app.listen(port, () => {
      debug(`Server is running on port ${port}`);
      console.log(`Server is running on port ${port}`); // Mensaje de éxito al iniciar el servidor
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
