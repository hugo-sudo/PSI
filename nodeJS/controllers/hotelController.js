const express = require('express');
var router = express.Router();

var { Hotel } = require('../models/hotel');
var ObjectId = require('mongoose').Types.ObjectId;

router.get('/', (req, res) => {
    Hotel.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Hotel :' + JSON.stringify(err, undefined, 2)); }
    });
});


router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Hotel.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Hotel :' + JSON.stringify(err, undefined, 2)); }
    });
});

/*router.post('/', (req, res) => {
    var hot = new Hotel({
        name: req.body.name,
        description: req.body.description,
        location: req.body.location,
        gps: req.body.gps,
        phone: req.body.phone,
        email: req.body.email,
    });
    hot.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Hotel Save :' + JSON.stringify(err, undefined, 2)); }
    });
});
*/
router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);
        console.log("router put");
        /*var hot = new Hotel({
            id: req.body.id,
            name: req.body.name,
            description: req.body.description,
            location: req.body.location,
            gps: req.body.gps,
            phone: req.body.phone,
            email: req.body.email,
            services: req.body.services,
            totalBedrooms: req.body.totalBedrooms,
            lowestPrice: req.body.lowestPrice,
            quarto1: req.body.quarto1,
            quarto1precoBaixa: req.body.quarto1precoBaixa,
            quarto1precoAlta: req.body.quarto1precoAlta,
            quarto1servicos: req.body.quarto1servicos,
            quarto2: req.body.quarto2,
            quarto2precoBaixa: req.body.quarto2precoBaixa,
            quarto2precoAlta: req.body.quarto2precoAlta,
            quarto2servicos: req.body.quarto2servicos,
            quarto3: req.body.quarto3,
            quarto3precoBaixa: req.body.quarto3precoBaixa,
            quarto3precoAlta: req.body.quarto3precoAlta,
            quarto3servicos: req.body.quarto3servicos,
            quarto4: req.body.quarto4,
            quarto4precoBaixa: req.body.quarto4precoBaixa,
            quarto4precoAlta: req.body.quarto4precoAlta,
            quarto4servicos: req.body.quarto4servicos,
            imagens: req.body.imagens,
            precoBaixa: req.body.precoBaixa,
            precoAlta: req.body.precoAlta,
            reservations: req.body.reservations
        });*/
        console.log("after hotel");
    Hotel.findByIdAndUpdate(req.params.id, { $set: {reservationsQuarto1: req.body.reservationsQuarto1,
        reservationsQuarto2: req.body.reservationsQuarto2, reservationsQuarto3: req.body.reservationsQuarto3,
        reservationsQuarto4: req.body.reservationsQuarto4 } }, { new: true }, (err, doc) => {
        if (!err) { console.log(doc.reservations + "\n" + doc._id); res.send(doc); }
        else { console.log('Error in Hotel Update :' + JSON.stringify(err, undefined, 2)); }
    });
});
/*
router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Hotel.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Hotel Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});*/

module.exports = router;
