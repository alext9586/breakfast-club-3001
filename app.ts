var app = require('express')();
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var api = require('./routes/api');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

http.listen(3000, () => {
    console.log('listening on *:3000');
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.use('/api', api);