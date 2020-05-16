const express = require('express');
const _ = require('underscore');

let Categoria = require('../models/categoria');
const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');

const app = express();
//===============================
//Mostrar todas las Categorias
//===============================
app.get('/categoria', verificaToken, (req, res) => {
    Categoria.find({})
        .sort('nomcategoria') //Esto es para ordenar Alfabeticamente
        .populate('usuario', 'nombre email') // Es para cuando tenemos un campo Object Id y podemos jalar la informacion hererada
        .exec((err, categorias) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                categorias
            });
        })
});
//===============================
//Mostrar una categoria por ID
//===============================
app.get('/categoria/:id', verificaToken, (req, res) => {

    let id = req.params.id;

    Categoria.findById(id, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!categoriaDB) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'El ID no es correcto'
                }
            });
        }
        res.json({
            ok: true,
            categoria: categoriaDB
        })
    });
});
//===============================
//Crear nueva  Categorias
//===============================
app.post('/categoria', verificaToken, (req, res) => {
    let body = req.body;

    let categoria = new Categoria({
        codcate: body.codcate,
        nomcategoria: body.nomcategoria,
        fotourl: body.fotourl,
        visible: body.visible,
        usuario: req.usuario._id
    });

    categoria.save((err, categoriaDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });
});
//===============================
//Modificar  Categorias
//===============================
app.put('/categoria/:id', verificaToken, (req, res) => {

    let id = req.params.id;
    let body = req.body;

    let descCategoria = {
        nomcategoria: body.nomcategoria,
        fotourl: body.fotourl,
        visible: body.visible,
    }

    Categoria.findByIdAndUpdate(id, descCategoria, { new: true, runValidators: true }, (err, categoriaDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        })
    });
});
//===============================
//Eliminar  Categorias
//===============================
app.delete('/categoria/:id', [verificaToken, verificaAdmin_Role], (req, res) => {

    let id = req.params.id;
    Categoria.findByIdAndRemove(id, (err, categoriaBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (!categoriaBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El id no existe'
                }
            });
        }
        res.json({
            ok: true,
            message: 'Categoria borrada'
        })
    });
});

//esto para exporat a otros archivos
module.exports = app;