let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let app = express();
let SSE = require('express-sse');
//trying changeStream
MapTile = require('./mapTileModel');
let uri = 'mongodb+srv://skane:jffFGpKi37dl6NaI@';
uri += 'amsurna-c9y7y.mongodb.net/Amsurna?retryWrites=true&w=majority';

//Import apiRoutes
let apiRoutes = require('./api-routes');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    next();
  });

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;

//create changeStream

changeStream = MapTile.watch();
let sse = new SSE();
app.get('/updates', sse.init);

changeStream.on('change', data=> {
    console.log(data);
    sse.send(data, 'update');
});

if(!db)  { console.log("Error connecting db"); }
else { console.log("Db connected successfully"); }

var port = process.env.PORT || 8080;

//TODO - send page to port? obvs not absolute path from my computer
app.get('/', (req, res) => res.send(''));

app.use('/api', apiRoutes);
app.listen(port, function() {
    console.log("Request on port " + port);
});