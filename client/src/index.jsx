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

    if (this.props.default === false) {
      $('#Modal').on('scroll', (e) => {
        const elem = $(e.currentTarget);
        if (elem[0].scrollHeight - elem.scrollTop() === elem.outerHeight()) {
          this.getScheduledExperiences();
        }
      });
    }
  }

  getScheduledExperiences() {
    axios.post('http://localhost:8000/experience/availableDate/', {
      data: this.state.counter,
    })
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
        <AvailableDateModalList availableDates={(this.props.default) ? this.state.availableDates.slice(0,3) : this.state.availableDates} />
      </div>
    );
  }
}

ReactDOM.render(<App default={false}/>, document.getElementById('app'));

ReactDOM.render(<App default={true}/>, document.getElementById('app2'));