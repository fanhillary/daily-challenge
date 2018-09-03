let express = require('express');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let pg = require('pg');
let path = require('path');

const PORT = 3000;

let pool = new pg.Pool({
    user: 'fanhillary',
    database: 'daily-challenge',
    host: 'localhost',
    port: 5432
}); // give access to pooling resource

let app = express();

// serve src/build upon accessing localhost:3000
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// for http request logging
app.use(morgan('dev'));

// allows request from client react side to postgres and express api
app.use(function(request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.listen(PORT, () => console.log('Listening on port ' + PORT));