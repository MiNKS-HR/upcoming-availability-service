var express = require('express');
var mongoose = require('mongoose');
var AvailableDates = require('../../db/models/availableDate.js');

var router = express.Router();

// router.route('/api')
//   .get(function (req, res) {
//     res.status(200).send('Hello World!');
//   });

router.route('/:id')
  .get(function (req, res) {
    console.log('req.params.id', req.params.id);
    var currentCount = req.params.id;
    AvailableDates.findSome(currentCount, (err, response) => {
      if (err) {
        console.log('Error retrieving data from database.' + err);
      } else {
        console.log('Successfully retrieved from database.');
        console.log(response);
        res.status(200).json(response);
      }
    });
  });

module.exports = router;