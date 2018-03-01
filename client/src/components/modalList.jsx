import React from 'react';
import AvailableDate from './AvailableDate.jsx';

class AvailableDateModalList extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render () {
    let {availableDates} = this.props;

    return (
      <div>
        {availableDates.map((availableDate, idx) => <AvailableDate availableDate={availableDate} key={idx}/>)}
      </div>
    )
  }
}

export default AvailableDateModalList;