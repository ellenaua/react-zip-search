import Rx from "rx";
import Searcher from './Searcher';

const searcher = new Searcher();

class SearchApp {

  constructor(){
    this.stateSubject = new Rx.ReplaySubject();
    this._setState({
      formZipCode: '',
      selectedZipCode: '',
      searchHistory: {
        // initial state can be loaded from localstorage or database
        '65432': {zipCode: '65432', 'place name': 'Test', state: 'IL'}
      }
    });
  }

  // private SearchApp methods
  
  _notifyStateChange() {
    this.stateSubject.onNext(this.state);
  }

  _setState(obj) {
    this.state = Object.assign(this.state || {}, obj);
    this._notifyStateChange();
  }

  _addPlaceToHistory(zipCode, place){
    this.state.searchHistory[zipCode] = Object.assign(place, {zipCode});
    this._notifyStateChange();
  }
  
  // public SearchApp methods

  findZipCode(zipCode) {

    // if place is already in history - highlight
    if (this.state.searchHistory[zipCode]) {
      return this._setState({'selectedZipCode': zipCode});
    }

    // find place and add it to history
    searcher.findPlace(zipCode)
      .then(place => this._addPlaceToHistory(zipCode, place))
      .catch(err => this._setState({errorMessage: err.message}));
  }

  selectZipCode(zipCode) {
    let selectedZipCode = this.state.selectedZipCode === zipCode ? '' : zipCode;
    this._setState({
      'formZipCode': selectedZipCode,
      'selectedZipCode': selectedZipCode
    })
  }

  deleteZipCode(zipCode) {
    delete this.state.searchHistory[zipCode];
    this._notifyStateChange();
  }

}


export default new SearchApp(); // it's singleton
