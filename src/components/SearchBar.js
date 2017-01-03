import React, { Component } from 'react'
import { Button, Dropdown, Input, Divider } from 'semantic-ui-react'
import Ajax from 'superagent';
import jsonp from 'superagent-jsonp';

const options = [
  { text: 'Russia', value: 'ru' },
  { text: 'US', value: 'us' },
  { text: 'Kazakhstan', value: 'kz' },
]

class SearchBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      url: 'https://itunes.apple.com/lookup?',
      app_id: '',
      country_code: 'us',
      result: {}
    };

    this.appNameChange = this.appNameChange.bind(this);
    this.countryChange = this.countryChange.bind(this);
    this.search = this.search.bind(this);
  }

  appNameChange = (e, { value }) => {
    let app_link = value;
    let splits = app_link.split('/id', 2);
    let id = splits[1].split('?', 1);
    this.setState({ app_id: id[0] });
  }
  countryChange = (e, { value }) => {
    this.setState({ country_code: value });
  }

  getLink = (url, app_id, country_code) => {
    return new Promise(function(resolve) {
      let lookup = url + 'id=' + app_id + '&country=' + country_code
      resolve(lookup);
    });
  }

  getData(url) {
    Ajax.get(url)
        .use(jsonp)
        .end((err, res) => {
          if (err && err.status === 404) {
            console.log('Fail request');
          }
          this.setState({ result: res.body.results[0] });
          console.log('Из getData(): ' + res.body.results[0].bundleId);
        });
  }

  search = () => {
    console.log('app id: ' + this.state.app_id);
    console.log('country: '+ this.state.country_code);
    let getAppLink = this.getLink(this.state.url, this.state.app_id, this.state.country_code);
    getAppLink
      .then(result => {
        console.log(result);  
        this.getData(result)
      });

  }

  render() {
    const country_code = this.state.country_code;
    return (
      <div className="ui grid">
        <div className="eight wide column">
          <Input fluid onChange={this.appNameChange} placeholder='Search...' />
        </div>
        <div className="four wide column">
          <Dropdown selection search options={options} value={country_code} onChange={this.countryChange} />
          
        </div>
        <div className="four wide column">
          <Button primary type='button' onClick={this.search}>Search</Button>
        </div>
        <div className="sixteen wide column">
          <Divider />
        </div>
        <pre>{JSON.stringify(this.state.result, null, 2)}</pre>
      </div>
    );
  }
}

export default SearchBar