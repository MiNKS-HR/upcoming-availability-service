import React from 'react';
import ReactDOM from 'react-dom';
import AvailableDateModalList from './components/modalList.jsx';
import Bootstrap from 'bootstrap';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      availableDates: [],
      counter: 0
    };
  }
  
  getScheduledExperiences() {
    $.ajax({
      url: 'http://localhost:8000/experience/availableDate/',
      method: 'POST',
      data: JSON.stringify({start: this.state.counter}),
      contentType: 'application/json',
      success: (data) => {
        let lastAvailableDate = data[data.length-1];
        
        this.setState({
          counter: lastAvailableDate.id,
          availableDates: this.state.availableDates.concat(data)
        })
      },
      error: (xhr, status, error) => {
        console.log('err', xhr, status, error);
      }
    })
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

  render() {
    return (
      <div>
        <AvailableDateModalList availableDates={this.state.availableDates}/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));