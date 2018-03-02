import React from 'react';
import $ from 'jquery';
import AvailableDateStyles from './AvailableDate.css';

class AvailableDate extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    let {availableDate} = this.props;

    return (
      <div>
        <div className="outer">
          <div className="text">
          {availableDate.id}
          {availableDate.starts_at}
          {availableDate.ends_at}
          {availableDate.price_per_guest}
          {availableDate.max_guests}
          {availableDate.remaining_capacity}</div>
          <button type="button" className="button">Choose</button>
        </div>
      </div>
    )
  }
}

export default AvailableDate;