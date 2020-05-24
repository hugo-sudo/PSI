const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://nigger:nigger@cluster0-5rpww.mongodb.net/hotel_library?retryWrites=true&w=majority', (err) => {
    if(!err)
        console.log('sucess');
    else
        console.log('Error in DB connection : ' + JSON.stringify(err, undefined, 2));
});

module.exports = mongoose;
