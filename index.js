const express = require('express');
const app = express();
const port = 9000;

app.listen(port, function(error) {
   if(error) {
       console.log("Unable to connect to server...");
       // below is called interpolation. To use it you must embed the message between back ticks ``
       console.log(`Error: ${ error }`);
   }
   console.log(`Server is running on port: ${ port }`);
});