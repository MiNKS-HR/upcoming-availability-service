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

    let startTime = moment(availableDate.start_date).format('h:mm a');
    let endTime = moment(availableDate.end_date).format('h:mm a');
    let dateFormatted = moment(availableDate.start_date).format('ddd, MMM D');
    
    let spotsLeft = availableDate.remaining_capacity;

    return (
      <div>
        <div className={styles.Outer}>
        <div className={styles.Inner}>
          {spotsLeft < 3 && <SpotsLeft spotsLeft={spotsLeft}/>}
          <div>
            <div className={styles.DateText}>
            {dateFormatted}
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