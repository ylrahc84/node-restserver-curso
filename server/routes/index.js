const express = require('express');

const app = express();

//Aqui importamos la configuracion de Rutas
app.use(require('./usuario'));
app.use(require('./login'));

module.exports = app;