let express = require('express');
let bodyParser = require('body-parser');
const cors = require('cors');

let app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', function(req,res){
    console.log('serving...');
    res.status(200).send('listening...');
});
// serve src/build upon accessing localhost:3000
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:true}));

// for http request logging
// app.use(morgan('dev'));

// allows request from client react side to postgres and express api
// app.use(function(request, response, next) {
//     response.header("Access-Control-Allow-Origin", "*");
//     response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });


app.listen(process.env.PORT, () => console.log('Listening on port ' + process.env.PORT));