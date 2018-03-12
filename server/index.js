var bodyParser = require('body-parser');
var express = require('express');
var mongoose = require('mongoose');
var availableDateRouter = require('./routers/availableDate.js');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const seed = require('../db/seed.js');
const path = require('path');

const config = require('../webpack.config.js');
const compiler = webpack(config);

var app = express();
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

mongoose.connect('mongodb://database/experiences');

app.use(bodyParser.json());

app.get('/:id', (req, res) => res.sendFile(path.join(__dirname, '..', 'public', 'index.html')));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '..', 'public', 'index.html')));
app.use('/availability/content/', express.static(path.join(__dirname, '..', 'public')));
app.use('/experience/availableDate', availableDateRouter);

app.listen(3002, function() {
  console.log('listening on port 3002');
});

module.exports = app;