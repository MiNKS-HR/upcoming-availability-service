import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import $ from 'jquery';
import AvailableDateModalList from './components/modalList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      availableDates: [],
      counter: 0,
    };
  }

  componentDidMount() {
    this.getScheduledExperiences();

    if (this.props.isModal) {
      $('#Modal').on('scroll', (e) => {
        const elem = $(e.currentTarget);
        if (elem[0].scrollHeight - elem.scrollTop() === elem.outerHeight()) {
          this.getScheduledExperiences();
        }
      });
    }
  }

  getScheduledExperiences() {
    let currentCounter = this.state.counter;

    axios.get('http://localhost:3002/experience/availableDate/' + currentCounter)
      .then((response) => {
        const responseData = response.data;
        const lastAvailableDate = responseData[responseData.length - 1];

        this.setState({
          counter: lastAvailableDate.id,
          availableDates: this.state.availableDates.concat(responseData),
        });
      })
      .catch((error) => {
        console.log('err', error);
      });
  }

  render() {
    return (
      <div>
        <AvailableDateModalList availableDates={(this.props.isModal) ? this.state.availableDates : this.state.availableDates.slice(0,3)} />
      </div>
    );
  }
}

ReactDOM.render(<App isModal={false}/>, document.getElementById('app2'));

ReactDOM.render(<App isModal={true}/>, document.getElementById('app'));