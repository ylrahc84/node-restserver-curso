require('./config/config')

const express = require('express')
const mongoose = require('mongoose');

const path = require('path'); //para resolver direcciones

const app = express()
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//Configuracion global de rutas
app.use(require('./routes/index'));

//Habilitar la carpeta public
app.use(express.static(path.resolve(__dirname, '../public')));

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