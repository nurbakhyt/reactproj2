import React, { Component } from 'react';
import './App.css';
import { Container, Icon } from 'semantic-ui-react';
import SearchBar from './components/SearchBar';
import Header from './components/Header';
// import Tabs from './components/Tabs';

class Test extends Component {
  render() {
    return (
      <div className="App">
        <Container text>
          <Header />
          
          <div className="ui top attached tabular menu">
            <a className="item active" data-tab="first">
              <Icon name='apple' />
              App Store
            </a>
            <a className="item" data-tab="second">
              <Icon name='android' />
              Google Play
            </a>
          </div>
          <div className="ui bottom attached tab segment active" data-tab="first">
            <SearchBar market="AppStore" />
          </div>
          <div className="ui bottom attached tab segment " data-tab="second">
            Google Play
          </div>
        </Container>
      </div>
    );
  }
}

export default Test;
