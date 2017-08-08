import React, { Component } from 'react';
import searchApp from '../SearchApp';

class SearchForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      formZipCode: ''
    }
    this._onChange = this._onChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
  }

  // subscribe for formZipCode changes in searchApp

  componentDidMount(){
    searchApp.stateSubject.subscribe((appState) => {
      this.setState({formZipCode: appState.formZipCode});
    })
  }

  render() {
    return (
      <form onSubmit={this._onSubmit}>
        <h1>Enter zip code</h1>
        <input type="tel" value={this.state.formZipCode}
               pattern="[0-9]{5}"
               required
               onFocus={this._onFocus}
               onChange={this._onChange} placeholder="Zip Code"/>
        <input type="submit" value="Search"/>
      </form>
    );
  }

  _onChange(e){
    this.setState({'formZipCode': e.target.value});
  }

  _onSubmit(e){
    e.preventDefault();
    this.setState({'formZipCode': ''});
    searchApp.findZipCode(this.state.formZipCode);
  }
}

export default SearchForm;
