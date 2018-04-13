const express = require('express');
const bodyParser = require('body-parser');
const api = require('./routes/api');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use('/api', api);

app.listen(port, () => console.log(`Listening on port ${port}`));
