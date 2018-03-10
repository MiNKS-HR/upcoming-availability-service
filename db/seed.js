var data = require('./seed_data.js');
var mongoose = require('mongoose');
var AvailableDates = require('./models/availableDate.js');

mongoose.connect('mongodb://localhost/experiences');

var seedDb = function (data) {
  AvailableDates.insertOne(data, function (err, response) {
    if (err) {
      console.log('Error inserting into database: ' + err);
    } else {
      console.log('Saved successfully to the database: ' + response);
    }
  });
};

seedDb(data);