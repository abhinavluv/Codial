const express = require('express');
const app = express();
const port = 9000;

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