//importing mongoose library
const mongoose = require('mongoose');

//connecting and giving a db name to our local database
mongoose.connect('mongodb://localhost/to_do_app_db');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'error connecting to db'));

//testing to see whether db is running or not
db.once('open', function(){
    console.log('successfully connected to the database');
})