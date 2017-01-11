import React, { Component } from 'react'
import Screen from './Screen'
import classNames from 'classnames'
import './screen.css'

class Iphone extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let classes = classNames('marvel-device', 'iphone6', 'black');
    return (
      <div className={classes}>
        <div className='top-bar'></div>
        <div className='sleep'></div>
        <div className='volume'></div>
        <div className='camera'></div>
        <div className='sensor'></div>
        <div className='speaker'></div>
        <div className='screen'>
          <Screen 
            appData={this.props.appData}
            screenshots={this.props.appData.screenshotUrls} />
        </div>
        <div className='home'></div>
        <div className='bottom-bar'></div>
    </div>
    );
  }
}

export default Iphone