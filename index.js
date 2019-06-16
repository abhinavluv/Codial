const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 9000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');

// configure sass middleware
app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

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

//set the ejs view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codial',
    // change secret key before deployment in production mode
    secret: 'codialblahblah',
    saveUninitialized: false,
    resave: false,
    cookie: {
        // setting maxAge in milliseconds
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore({
        mongooseConnection: db,
        autoRemove: 'disabled'
    }, function(error) {
        console.log(error || 'Connect-mongodb setup good to go...');
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//Use express router from routes/index.js
app.use('/', require('./routes'));

app.listen(port, function(error) {
   if(error) {
       console.log("Unable to connect to server...");
       // below is called interpolation. To use it you must embed the message between back ticks ``
       console.log(`Error: ${ error }`);
   }
   console.log(`Server is running on port: ${ port }`);
});