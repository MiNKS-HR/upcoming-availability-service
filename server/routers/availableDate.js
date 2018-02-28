var express = require('express');
var mongoose = require('mongoose');
var AvailableDates = require('../../db/models/availableDate.js');

var router = express.Router();

router.route('/')
  .post(function (req, res) {
    var currentCount = req.body.start;
    AvailableDates.findSome(currentCount, (err, response) => {
      if (err) {
        console.log('Error retrieving data from database.');
      } else {
        console.log('Successfully retrieved from database.');
        res.json(response);
      }
    });
  });

module.exports = router;