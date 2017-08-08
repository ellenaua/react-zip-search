import React, { Component } from 'react';
import './SearchResult.css';
import searchApp from '../SearchApp';

/**
 * Displays search result row
 */
class SearchResult extends Component {

  constructor(props) {
    super(props);
    this._onSelect = this._onSelect.bind(this);
    this._onDelete = this._onDelete.bind(this);
  }

  render(){
    return (
      <div onClick={this._onSelect} className={'searchResult ' + (this.props.selected ? 'selected' : '')}>
        {this.props.place.zipCode} - {this.props.place['place name']}, {this.props.place.state}
        {this.props.selected ? <a className="delete" onClick={this._onDelete}>X</a> : ''}
      </div>
    )
  }

  _onSelect(){
    searchApp.selectZipCode(this.props.place.zipCode)
  }

  _onDelete(){
    searchApp.deleteZipCode(this.props.place.zipCode)
  }

}

export default SearchResult;
