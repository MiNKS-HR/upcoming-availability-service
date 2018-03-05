import React from 'react';
import SpotsLeft from './spotsLeft.jsx';
import styles from './AvailableDate.css';
var moment = require('moment');

class AvailableDate extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { availableDate } = this.props;
    var __startTime = moment(availableDate.start_date).format('h:mm a');
    var __endTime = moment(availableDate.end_date).format();
    
    var __duration = moment.duration(moment(__endTime).diff(__startTime));
    var __hours = __duration.asHours();
    console.log(__hours);

    let startTime = moment(availableDate.start_date).format('h:mm a');
    let endTime = moment(availableDate.end_date).format('h:mm a');

    let dateStr = moment(availableDate.start_date).format('ddd, MMM D');


    let spotsLeft = availableDate.remaining_capacity;
    return (
      <div>
        <div className={styles.Outer}>
        <div className={styles.Inner}>
          {spotsLeft < 3 && <SpotsLeft spotsLeft={spotsLeft}/>}
          <div>
            {/* {availableDate.id} */}
            {/* {availableDate.start_date} */}
            {/* {availableDate.end_date} */}
            {/* {availableDate.max_guests} */}
            <div className={styles.DateText}>
            {dateStr}
            </div>
            <div className={styles.TimeText}>
            {startTime} − {endTime}
            </div>
            <div className={styles.DetailText}>
              {availableDate.price_per_guest} per person
            </div>
          </div>
          <button type="button" className={styles.Button}>Choose</button>
          </div>
        </div>
      </div>
    )
  }
}


export default AvailableDate;