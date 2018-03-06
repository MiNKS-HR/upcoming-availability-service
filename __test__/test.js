const React = require('react');
const enzyme = require('enzyme');  
const { shallow, mount, render } = require('enzyme'); 
const Adapter = require('enzyme-adapter-react-16');
var mongoose = require('mongoose');
var Mockgoose = require('mockgoose').Mockgoose;
var mockgoose = new Mockgoose(mongoose);
const app = require('../server/index.js');
const request = require('supertest');
const AvailableDates = require('../db/models/availableDate.js');

enzyme.configure({ adapter: new Adapter() });

const testEntry = {
  "id": 1,
  "start_date": "2018-03-01T20:00:00.000Z",
  "end_date": "2018-03-01T22:00:00.000Z",
  "price_per_guest": "$2.56",
  "max_guests": 73,
  "remaining_capacity": 10
};

const testEntry2 = {
  "id": 2,
  "start_date": "2018-03-01T21:00:00.000Z",
  "end_date": "2018-03-01T23:00:00.000Z",
  "price_per_guest": "$350",
  "max_guests": 70,
  "remaining_capacity": 1
};

// describe('client', () => {
//   it('should render without throwing an error', function() {
//     expect(shallow(<AvailableDate />).contains(<div className="foo">Bar</div>)).toBe(true);
//   });

//   it('should be selectable by class "foo"', function() {
//     expect(shallow(<AvailableDate />).is('.foo')).toBe(true);
//   });

//   it('should mount in a full DOM', function() {
//     expect(mount(<AvailableDate />).find('.foo').length).toBe(1);
//   });

//   it('should render to static HTML', function() {
//     expect(render(<AvailableDate />).text()).toEqual('Bar');
//   });

// });

describe('server', () => {
  beforeEach((done) => {
    jest.setTimeout(10000);
    mongoose.connection.close();
    
    mockgoose.prepareStorage().then(function() {
      mongoose.connect('mongodb://localhost/test', (err) => {
        done(err);
      });
    });
  });

  it('should get a response code of 200', () => {
    AvailableDates.insertOne(testEntry, () => {
      request(app).get('/experience/availableDate/0').expect(200, function(err){
        console.log(err);
      });
    })
  });
  
});

describe('database', () => {

  beforeEach((done) => {
    jest.setTimeout(10000);
    mongoose.connection.close();
    
    mockgoose.prepareStorage().then(function() {
      mongoose.connect('mongodb://localhost/test', (err) => {
        done(err);
      });
    });
  });
  
  it('should return an both available date if the counter passed in is less than both ids', () => {
    AvailableDates.insertOne(testEntry, () => {
      AvailableDates.insertOne(testEntry2, () => {
        AvailableDates.findSome(0, (err, dates) => {
          if (err) throw err;
          expect(dates.length).toEqual(2);
        });
      })
    })
  });
  
  it('should insert an available date into database', () => {
    AvailableDates.insertOne(testEntry2, () => {
      AvailableDates.findAll((err, dates) => {
        console.log(dates)
        if (err) throw err;
        expect(dates.length).toEqual(1);
      });
    })
  });
  
  it('should not return an available date if the id passed in is not equal to the data id', () => {
    AvailableDates.insertOne(testEntry, () => {
      AvailableDates.findOne(0, (err, dates) => {
        console.log(dates)
        if (err) throw err;
        expect(dates.length).toEqual(0);
      });
    })
  });

});



