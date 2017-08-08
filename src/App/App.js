import React, { Component } from 'react';
import './App.css';

import SearchForm from '../SearchForm/SearchForm';
import SearchResults from '../SearchResults/SearchResults';

class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <SearchForm></SearchForm>
        <SearchResults></SearchResults>
      </div>
    );
  }
}

export default App;
