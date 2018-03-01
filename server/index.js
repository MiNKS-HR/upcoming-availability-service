var bodyParser = require('body-parser');
var express = require('express');
var mongoose = require('mongoose');
var availableDateRouter = require('./routers/availableDate.js');

var app = express();
mongoose.connect('mongodb://localhost/experiences');

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));
app.use('/experience/availableDate', availableDateRouter);

app.listen(8000, function() {
  console.log('listening on port 8000');
});