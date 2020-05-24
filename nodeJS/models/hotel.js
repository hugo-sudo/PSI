const mongoose = require('mongoose');



var Hotel = mongoose.model('Hotel', {
    name: { type: String },
    description: { type: String },
    location: { type: String },
    gps: { type: String },
    phone: { type: String },
    email: { type: String },
    services: {type: [String, String, String, String, String, String]},
    totalBedrooms: { type: String },
    lowestPrice: {type: Number},
    quarto1:{type: [String]},
    nDispReservationsQuarto1: {type: Number },
    quarto1precoBaixa: {type: Number },
    quarto1precoAlta: {type: Number },
    quarto1servicos:{type: [String]},
    reservationsQuarto1: { type: Array},
    quarto2:{type: [String]},
    nDispReservationsQuarto2: {type: Number },
    quarto2precoBaixa: {type: Number },
    quarto2precoAlta: {type: Number },
    quarto2servicos:{type: [String]},
    reservationsQuarto2: { type: Array},
    quarto3:{type: [String]},
    nDispReservationsQuarto3: {type: Number },
    quarto3precoBaixa: {type: Number },
    quarto3precoAlta: {type: Number },
    quarto3servicos:{type: [String]},
    reservationsQuarto3: { type: Array},
    quarto4:{type: [String]},
    nDispReservationsQuarto4: {type: Number },
    quarto4precoBaixa: {type: Number },
    quarto4precoAlta: {type: Number },
    quarto4servicos:{type: [String]},
    reservationsQuarto4: { type: Array},
    imagens: {type: [String]},
    precoBaixa: { type: [String] },
    precoAlta: { type: [String] }
});

module.exports = { Hotel };