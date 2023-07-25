// Require the library
const mongoose = require('mongoose');

// Connect to the local database
mongoose.connect("mongodb://localhost:27017/uploaded-csv");

// Acquire the database
const connection = mongoose.connection;

// Connecting error
connection.on('error',console.error.bind(console,"error in database connection"))

// Successful connection
connection.once('open',function(){console.log("Database connected successfully!")})