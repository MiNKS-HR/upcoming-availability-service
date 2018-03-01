import React from 'react';
import $ from 'jquery';

var entryStyle = {
  button: {
    float: 'right'
  },
  text: {
    float: 'left',
    lineHeight: '30px'
  },
  outer: {
    borderBottomWidth: '1px', 
    borderBottomStyle: 'solid', 
    borderBottomColor: 'gray',
    height: '30px'
  }
};

class AvailableDate extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    let {availableDate} = this.props;

    return (
      <div>
        <div style={entryStyle.outer}>
          <div style={entryStyle.text}>{availableDate.id}</div>
          <div style={entryStyle.text}>{availableDate.starts_at}</div>
          <div style={entryStyle.text}>{availableDate.ends_at}</div>
          <div style={entryStyle.text}>{availableDate.price_per_guest}</div>
          <div style={entryStyle.text}>{availableDate.max_guests}</div>
          <div style={entryStyle.text}>{availableDate.remaining_capacity}</div>

          <button type="button" style={entryStyle.button}>Choose</button>
        </div>
      </div>
    )
  }
}

export default AvailableDate;