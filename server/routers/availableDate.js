var express = require('express');
var mongoose = require('mongoose');
var AvailableDates = require('../../db/models/availableDate.js');

var router = express.Router();

router.route('/')
  .post(function (req, res) {
    var currentCount = req.body.data;
    AvailableDates.findSome(currentCount, (err, response) => {
      if (err) {
        console.log('Error retrieving data from database.' + err);
      } else {
        console.log('Successfully retrieved from database.');
        res.status(200).json(response);
      }
    });
  });

  router.route('/').get(function (req, res) {
    res.status(200);
  });

module.exports = router;