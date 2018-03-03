const React = require('react');
const enzyme = require('enzyme');  
const { shallow, mount, render } = require('enzyme'); 
const Adapter = require('enzyme-adapter-react-16');
const Mongoose = require('mongoose').Mongoose;
const mongoose = new Mongoose();
const Mockgoose = require('mockgoose').Mockgoose;
const mockgoose = new Mockgoose(mongoose);
const app = require('../server/index.js');
const request = require('supertest');
//const AvailableDate = require('../client/src/components/AvailableDate.jsx');
const AvailableDates = require('../db/models/availableDate.js');

enzyme.configure({ adapter: new Adapter() });
const data = {
  "id": 1,
  "start_date": "2018-03-01T20:00:00.000Z",
  "end_date": "2018-03-01T22:00:00.000Z",
  "price_per_guest": "$2.56",
  "max_guests": 73,
  "remaining_capacity": 46
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
  it('should get a response code of 200', (done) => {
    request(app).get('/').end((err, res) => {
      expect(res.statusCode).toBe(200);
      done();
    });;
  });

});

describe('database', () => {
  beforeEach((done) => {
    jest.setTimeout(10000);
    mongoose.connection.close();
    mockgoose.prepareStorage().then(() => {
      mongoose.connect('mongodb://localhost/experiences', (err) => {
        done(err);
      });
    });
  });

  it('should insert an available date into database', () => {
    AvailableDates.insertOne(data, () => {
      AvailableDates.findAll((err, data) => {
        if (err) throw err;
        expect(data.length).toEqual(1);
      });
    })
  });

  it('should not return an available date if the counter passed in is larger than the id', () => {
    AvailableDates.insertOne(data, () => {
      AvailableDates.findSome(2, (err, data) => {
        if (err) throw err;
        expect(data.length).toEqual(0);
      });
    })
  });

  it('should not return an available date if the id passed in is not equal to the data id', () => {
    AvailableDates.insertOne(data, () => {
      AvailableDates.findOne(2, (err, data) => {
        if (err) throw err;
        expect(data.length).toEqual(0);
      });
    })
  });

  it('should return an available date if the id passed in is equal to the data id', () => {
    AvailableDates.findOne(1, (err, data) => {
      if (err) throw err;
      expect(data.length).toEqual(0);
    });
  });

});