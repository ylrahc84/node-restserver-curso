//=========================
//Puerto
//=========================
process.env.PORT = process.env.PORT || 3000;

//=========================
//Entorno
//=========================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
//=========================
//Vencimineto de token
//=========================
//60 segundos
//60 minutos
//24 horas 
//30 dias
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;


//=========================
//SEED de autenticacion
//=========================

process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

//=========================
//Base de Datos
//=========================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.mongo_uri;
}

process.env.URLDB = urlDB;

//=========================
//Google client ID
//=========================
process.env.CLIENT_ID = process.env.CLIENT_ID || '268735107240-a6ovsppgklil1q2453amlfthrtgbejcc.apps.googleusercontent.com';