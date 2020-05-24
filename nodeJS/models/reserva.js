const mongoose = require('mongoose');



var Reserva = mongoose.model('Reserva', {
    nomeHotel: { type: String },
    datas: { type: String },
    tipoQuarto: { type: String },
    nome: { type: String },
    morada: { type: String },
    telefone: { type: String },
    email: { type: String },
    NIF: { type: String },
    nCartao: { type: String },
    prazo: { type: String },
    cvv: { type: String },
    totalPago: {type: Number} 
});

module.exports = { Reserva };