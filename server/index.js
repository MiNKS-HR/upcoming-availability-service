var bodyParser = require('body-parser');
var express = require('express');
var mongoose = require('mongoose');
var availableDateRouter = require('./routers/availableDate.js');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const seed = require('../db/seed.js');

const config = require('../webpack.config.js');
const compiler = webpack(config);

var app = express();
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

mongoose.connect('mongodb://database/experiences');

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../public'));
app.use('/experience/availableDate', availableDateRouter);

console.log('mongoose.connection.readyState', mongoose.connection.readyState);
app.listen(3002, function() {
  console.log('listening on port 3002');
});

module.exports = app;