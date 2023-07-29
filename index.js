const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const dotenv = require('dotenv');
dotenv.config()
// Add database config
require('./config/db.config');


// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(express.static('assets'));

// use express router
app.use('/', require('./routes'));


app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
