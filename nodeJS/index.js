const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { mongoose } = require('./db.js');
var hotelController = require('./controllers/hotelController.js');
var reservaController = require('./controllers/reservaController.js');
var userController = require('./controllers/userController.js')

var app = express();
app.use(bodyParser.json());
//appserver.alunos.di.fc.ul.pt
app.use(cors({ origin: 'http://localhost:3059' }));
app.listen(3009, () => console.log('Server started at port : 3009'));

app.use('/reserva', reservaController);
app.use('/hotel', hotelController);
app.use('/user', userController);


