require('./config/config')

const express = require('express')
const mongoose = require('mongoose');

const app = express()
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//Aqui importamos la configuracion de Usuario
app.use(require('./routes/usuario'));

//Cadena de conecciones a mongo DB

mongoose.connect(process.env.URLDB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, res) => {
    if (err) throw err;
    console.log('Base de datos ONLINE');
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando el puerto: ', 3000);
})