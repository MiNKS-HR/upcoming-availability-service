var mongoose = require('mongoose');

var availableDateSchema = mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  start_date: String,
  end_date: String,
  price_per_guest: String,
  max_guests: Number,
  remaining_capacity: Number,
});

var availableDateModel = mongoose.model('AvailableDate', availableDateSchema);

// findAll retrieves all available dates
function findAll(callback) {
  availableDateModel.find({}, callback);
}

// findSome retrieves 50 available dates with an id greater than the currentCounter variable
function findSome(currentCounter, callback) {
  availableDateModel.find({}, callback).where('id').gt(currentCounter).limit(50).sort({ id: 1 });
}

// findOne will retrieve the available dates associated with the given id
function findOne(id, callback) {
  availableDateModel.find({id: id}, callback);
}

// insertOne inserts an available date into the db
function insertOne(availableDate, callback) {
  availableDateModel.create(availableDate, callback);
}

exports.findOne = findOne;
exports.findAll = findAll;
exports.findSome = findSome;
exports.insertOne = insertOne;