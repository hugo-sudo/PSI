const express = require('express');
var router = express.Router();

var { Reserva } = require('../models/reserva');
var ObjectId = require('mongoose').Types.ObjectId;

router.get('/', (req, res) => {
    Reserva.find((err, docs) => {
        if (!err) { console.log("executado"); res.send(docs); }
        else { console.log('Error in Retriving Reserva :' + JSON.stringify(err, undefined, 2)); }
    });
});


router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Reserva.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Reserva :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req, res) => {
    console.log("DENTRO POST");
    var reserva = new Reserva({
        nomeHotel: req.body.nomeHotel,
        datas: req.body.datas,
        tipoQuarto: req.body.tipoQuarto,
        nome: req.body.nome,
        morada: req.body.morada,
        telefone: req.body.telefone,
        email: req.body.email,
        NIF: req.body.NIF,
        nCartao: req.body.nCartao,
        prazo: req.body.prazo,
        cvv: req.body.cvv,
        totalPago: req.body.totalPago
    });
    reserva.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Reserva Save :' + JSON.stringify(err, undefined, 2)); }
    });
});



module.exports = router;
