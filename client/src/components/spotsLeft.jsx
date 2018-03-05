import React from 'react';
import styles from './SpotsLeft.css';

class SpotsLeft extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { spotsLeft } = this.props;

    return (
      <div className={styles.Outer}>
        <div className={styles.Inner}>
          <span className={styles.Text}>
            {spotsLeft} {spotsLeft === 1 ?  'spot left' : 'spots left'}
          </span>
        </div>
      </div>
    )
  }
}  

export default SpotsLeft;