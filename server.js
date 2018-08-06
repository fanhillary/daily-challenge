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

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'), function(err) {
    if (err) {
        res.status(500).send(err)
      }
    })
})
  
app.post('api/new-command', function(request, response) {
    console.log(request.body);
    var commands = request.body.commands;
    var type = request.body.type;
    var users = request.body.id;
    let values = [commands, type, users];

    // connect to the postgres database
    pool.connect(( err, db, done) => {
        if (err) {
            return response.status(400).send(err);
        } else {
            db.query('INSERT INTO completed (commands, type, users) VALUES($1, $2, $3)', [... values ], (err, table) => {
                done();
                if (err) {
                    return response.status(400).send(err);
                } else {
                    console.log('DATA INSERTED');
                    db.end(); // close connection
                    response.status(201).send({message: "Data inserted!"});
                }
            })
        }
    })

});

app.listen(PORT, () => console.log('Listening on port ' + PORT));