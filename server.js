const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();
var Users = require('./server/models/users');

const api = require('./server/routes/api');  // Notre API qui échange avec Mongodb

//On utilise express-session et passport pour gerer l'authentification
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash'); //special aera session for storing messages

app.use(session({ secret: 'keyboard cat',
                  cookie: { httpOnly: false, maxAge: 900000},
                  rolling: true,
                  resave: true,
                  saveUninitialized:true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

// API location
app.use('/api', api);

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));

require('./server/passport/passport.js')(passport,Users);
