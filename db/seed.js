var data = require('./seed_data.js');
var mongoose = require('mongoose');
var AvailableDates = require('./models/availableDate.js');

mongoose.connect('mongodb://localhost/experiences');

var seedDb = function (data) {
  AvailableDates.insertOne(data, function (err, response) {
    mongoose.connection.close(function () {
      if (err) {
        console.log('Error inserting into database: ' + err);
      } else {
        console.log('Saved successfully to the database: ' + response);
      }
      console.log("Connection closed.");
    });
  });
};

seedDb(data);