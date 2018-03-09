import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import $ from 'jquery';
import AvailableDateModalList from './components/modalList.jsx';
import Modal from './components/modal-shim.js';
import { Button } from 'react-bootstrap';
import styles from './index.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lgShow: false,
      availableDates: [],
      counter: 0,
      direction: '',
      lastScrollPos: 0
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    this.getScheduledExperiences();
  }

  getScheduledExperiences() {
    let currentCounter = this.state.counter;

    axios.get('experience/availableDate/' + currentCounter)
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

  handleScroll(event) {
    const elem = event.currentTarget;

    if (elem.scrollHeight - elem.offsetHeight === elem.scrollTop) {
      this.getScheduledExperiences();
    }
  }

  render() {
    let lgClose = () => this.setState({ lgShow: false });

    return (
      <div>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"></link>
        <div>
          <div className={styles['page-container']}>
            <div className={styles['title']}>Upcoming availability</div>
            <AvailableDateModalList availableDates={this.state.availableDates.slice(0, 3)} />
            <div className={styles['button-container']}>
              <div
                className={styles['button']}
                onClick={() => this.setState({ lgShow: true })}
              >
                See all available dates
          </div>
            </div>

            <AvailableDateModal
              show={this.state.lgShow}
              onHide={lgClose}
              onScroll={this.handleScroll}
              availabledates={this.state.availableDates}
            />
          </div>
        </div>
      </div>
    );
  }
};

class AvailableDateModal extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.availabledates);
  }

  render() {
    return (
      <Modal
        {...this.props}
        bsSize="large"
        aria-labelledby="contained-modal-title-lg"
      >
        <div className={styles['modal-content']}>
          <div className={styles['modal-body']}>
            <div className={styles['modal-close']}>
              <svg onClick={this.props.onHide} className={styles['modal-close-button']} viewBox="0 0 24 24" role="img" focusable="false"><path d="m23.25 24c-.19 0-.38-.07-.53-.22l-10.72-10.72-10.72 10.72c-.29.29-.77.29-1.06 0s-.29-.77 0-1.06l10.72-10.72-10.72-10.72c-.29-.29-.29-.77 0-1.06s.77-.29 1.06 0l10.72 10.72 10.72-10.72c.29-.29.77-.29 1.06 0s .29.77 0 1.06l-10.72 10.72 10.72 10.72c.29.29.29.77 0 1.06-.15.15-.34.22-.53.22" fillRule="evenodd"></path></svg>
            </div>
            <br />
            <div className={styles['modal-title']}>When do you want to go?</div>
            <div className={styles['modal-subtitle']}>If you can’t find the dates you want, try contacting the host</div>
            <AvailableDateModalList availableDates={this.props.availabledates} />
          </div>
        </div>
      </Modal>
    );
  }
}

export default App;

ReactDOM.render(<App/>, document.getElementById('app'));