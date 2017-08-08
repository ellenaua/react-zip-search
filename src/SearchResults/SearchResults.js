import React, { Component } from 'react';

import SearchResult from '../SearchResult/SearchResult';
import searchApp from '../SearchApp';

/**
 * Displays search results, allows to delete and filter them
 */

class SearchResults extends Component {

  constructor(props) {
    super(props);
    this.state = {sortBy: 'zipCode'}
    this._getClass = this._getClass.bind(this);
  }

  // subscribe for searchHistory and selectedZipCode changed
  // searchHistory also can be passed as property, it you need to make SearchResults
  // component reusable

  componentDidMount(){
    searchApp.stateSubject.subscribe((appState) => {
      this.setState({
        searchHistory: appState.searchHistory,
        selectedZipCode: appState.selectedZipCode
      });
    })
  }

  _renderSearchResults(results) {
    return results.map(place => (
      <SearchResult
        key={place.zipCode}
        place={place}
        selected={place.zipCode == this.state.selectedZipCode}>
      </SearchResult>
    ));
  }

  _renderSortPanel() {
    return (<p className="SortPanel">
      Sort by:
      <a onClick={() => this._sortBy('place name')} className={this._getClass('place name')}>place name</a>,
      <a onClick={() => this._sortBy('state')} className={this._getClass('state')}>state</a>,
      <a onClick={() => this._sortBy('zipCode')} className={this._getClass('zipCode')}>zip code</a>
    </p>)
  }

  render() {

    if (!this.state.searchHistory) return (<div></div>);

    let results = Object.values(this.state.searchHistory)
      .sort(this._getSortFunction(this.state.sortBy));

    return (
      <div className="App">
        <h1>Search results:</h1>

        {this._renderSearchResults(results)}
        {this._renderSortPanel()}

        <br/>
        <small>Click on item to remove it</small>
      </div>
    );
  }

  _sortBy(field) {
    this.setState({'sortBy': field});
  }

  _getSortFunction(field) {
    return (a, b) => {
      if (a[field] == b[field]) return 0;
      return a[field] < b[field] ? -1 : 1;
    }
  }

  _getClass(field){
    return this.state.sortBy === field ? 'selected' : '';
  }
}

export default SearchResults;
