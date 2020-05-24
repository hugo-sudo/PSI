const express = require('express');
var router = express.Router();

var { User } = require('../models/user');
var ObjectId = require('mongoose').Types.ObjectId;

router.get('/', (req, res) => {
    User.find((err, docs) => {
        if (!err) { console.log("executado"); res.send(docs); }
        else { console.log('Error in Retriving User :' + JSON.stringify(err, undefined, 2)); }
    });
});


router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    User.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving User :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req, res) => {
    console.log("DENTRO POST");
    var user = new User({
        email: req.body.email,
        password: req.body.password,
    });
    user.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in User Save :' + JSON.stringify(err, undefined, 2)); }
    });
});



module.exports = router;