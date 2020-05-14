const express = require('express');
const _ = require('underscore');

let Producto = require('../models/producto');
const { verificaToken } = require('../middlewares/autenticacion');

const app = express();
//===============================
//Mostrar todas los Productos
//===============================
app.get('/producto', verificaToken, (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    Producto.find({ disponible: true })
        .skip(desde)
        .limit(10)
        .sort('nombre') //Esto es para ordenar Alfabeticamente
        .populate('usuario', 'nombre email') // Es para cuando tenemos un campo Object Id y podemos jalar la informacion hererada
        .populate('categoria', 'descripcion') // Es para cuando tenemos un campo Object Id y podemos jalar la informacion hererada
        .exec((err, productos) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                productos
            });
        })
});
//===============================
//Mostrar una Productos por ID
//===============================
app.get('/producto/:id', verificaToken, (req, res) => {
    //Categoria.findById();
    let id = req.params.id;

    Producto.findById(id)
        .populate('usuario', 'nombre email') // Es para cuando tenemos un campo Object Id y podemos jalar la informacion hererada
        .populate('categoria', 'nombre') // Es para cuando tenemos un campo Object Id y podemos jalar la informacion hererada
        .exec((err, productoDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            if (!productoDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'El ID no es correcto'
                    }
                });
            }
            res.json({
                ok: true,
                producto: productoDB
            })
        });
});

//===============================
//Buscar Productos
//===============================
app.get('/producto/buscar/:termino', verificaToken, (req, res) => {

    let termino = req.params.termino;
    let reges = new RegExp(termino, 'i'); //ESta linea es para buscar por coindicencias 

    Producto.find({ nombre: reges })
        .populate('categoria', 'nombre') // Es para cuando tenemos un campo Object Id y podemos jalar la informacion hererada
        .exec((err, productos) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                productos
            })

        })
});

//===============================
//Crear nueva  Productos
//===============================
app.post('/producto', verificaToken, (req, res) => {
    let body = req.body;

    let producto = new Producto({
        usuario: req.usuario._id,
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria,
    });

    producto.save((err, productoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            producto: productoDB
        });
    });
});
//===============================
//Modificar  Productos
//===============================
app.put('/producto/:id', verificaToken, (req, res) => {

    let id = req.params.id;
    let body = req.body;
    //Verificar que el ID exista en la Base de Datos
    Producto.findById(id, (err, productoDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID no existe'
                }
            });
        }
        productoDB.nombre = body.nombre;
        productoDB.precioUni = body.precioUni;
        productoDB.categoria = body.categoria;
        productoDB.disponible = body.disponible;
        productoDB.descripcion = body.descripcion;

        productoDB.save((err, productoGuardado) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                producto: productoGuardado
            });
        });
    });
});
//===============================
//Eliminar  Productos
//===============================
app.delete('/producto/:id', verificaToken, (req, res) => {
    let id = req.params.id;

    let cambiaEstado = {
        disponible: false
    };

    //Verificar que el ID exista en la Base de Datos
    Producto.findById(id, (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID no existe'
                }
            });
        }
        productoDB.disponible = false;
        productoDB.save((err, productoBorrado) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                producto: productoBorrado,
                message: 'Producto borrado'
            });
        });
    });
});

//esto para exporat a otros archivos
module.exports = app;