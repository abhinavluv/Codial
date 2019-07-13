const mongoose = require('mongoose');

// provide a connection to codial_development database
mongoose.connect('mongodb://localhost/codial_development', { useFindAndModify: false });

// setting up the database
const db = mongoose.connection;

// if while connection to db we get an error, we show an error message on console
db.on('error', console.error.bind(console, "Error connecting to mongodb..."));

// Once db gets connected, call the callback function
db.once('open', function() {
   console.log("Connected to database mongodb");
});

module.exports = db;
