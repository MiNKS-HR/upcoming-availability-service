import React from 'react';
import ReactDOM from 'react-dom';
import AvailableDateModalList from './components/modalList.jsx';
import axios from 'axios';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      availableDates: [],
      counter: 0
    };
  }
  
  componentDidMount() {
    this.getScheduledExperiences();
    
    $("#exampleModalLong").on("scroll", (e) => {
      var elem = $(e.currentTarget);
      if (elem[0].scrollHeight - elem.scrollTop() == elem.outerHeight()) {
        this.getScheduledExperiences();
      }
    });
  }

  getScheduledExperiences() {
    axios.post('http://localhost:8000/experience/availableDate/', {
      data: this.state.counter
    })
    .then( (response) => {
      let responseData = response.data;
      let lastAvailableDate = responseData[responseData.length-1];
        
      this.setState({
        counter: lastAvailableDate.id,
        availableDates: this.state.availableDates.concat(responseData)
      })
    })
    .catch(function (error) {
      console.log('err', error);
    });
  }

  render() {
    return (
      <div>
        <AvailableDateModalList availableDates={this.state.availableDates}/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));