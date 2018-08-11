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
app.use(express.static(path.join(__dirname, 'src/build')));
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
  
app.post('/new-command', function(request, response) {
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
                    db.end(); // close connection
                    response.status(201).send({message: "Data inserted!"});
                }
            })
        }
    })
});

app.post('/create-user', function(request, response) {
    var first_name = request.body.first_name;
    var email = request.body.email;
    var password = request.body.password;
    let values = [first_name, email, password];

    // connect to the postgres database
    pool.connect(( err, db, done) => {
        if (err) {
            return response.status(400).send(err);
        } else {
            db.query('INSERT INTO users (first_name, email, password) VALUES($1, $2, crypt($3, gen_salt(\'bf\')))', [... values ], (err, table) => {
                done();
                if (err) {
                    return response.status(400).send(err);
                } else {
                    db.end(); // close connection
                    response.status(201).send({message: "New User Created!"});
                }
            })
        }
    })
});

app.post('/remove-command', function(request, response) {
    var commands = request.body.commands;
    var type = request.body.type;
    var users = request.body.id;
    let values = [commands, type, users];
    // connect to the postgres database
    pool.connect(( err, db, done) => {
        if (err) {
            return response.status(400).send(err);
        } else {
            // TODO still needs to only update if already exists
            db.query('DELETE FROM completed WHERE commands = $1', [... values ], (err, table) => {
                done();
                if (err) {
                    return response.status(400).send(err);
                } else {
                    db.end(); // close connection
                    response.status(201).send({message: "Data removed!"});
                }
            })
        }
    })

});
app.listen(PORT, () => console.log('Listening on port ' + PORT));