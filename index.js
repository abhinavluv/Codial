const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 9000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

// reading through the post request
app.use(express.urlencoded());

// setting up cookie parser
app.use(cookieParser());

// place layouts before routes so that routes can use our layouts
app.use(expressLayouts);

// extract scripts and links from subpagesinto the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// configure static files usage
app.use(express.static('./assets'));

//Use express router from routes/index.js
app.use('/', require('./routes'));

//set the ejs view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function(error) {
   if(error) {
       console.log("Unable to connect to server...");
       // below is called interpolation. To use it you must embed the message between back ticks ``
       console.log(`Error: ${ error }`);
   }
   console.log(`Server is running on port: ${ port }`);
});