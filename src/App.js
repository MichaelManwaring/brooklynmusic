import React, { Component } from 'react';
import './App.css';

import ConcertMap from './components/ConcertMap';
import ControlPanel from './components/ControlPanel';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      venues: [],
      query: ""
    };
    this.filterVenues = this.filterVenues.bind(this);
  }
  // once the app is loaded, this collects the venue info from foursquare and adds an "isOpen" category to use with the markers
  componentDidMount(){
    fetch(`https://api.foursquare.com/v2/venues/search?v=20180323
      &intent=browse
      &near=Brooklyn
      &categoryId=5032792091d4c4b30a586d5c,4bf58dd8d48988d1e5931735
      &client_id=WT5DUCMADRKG4KK4E413T1XJMNAUAVSF0SNRS3JQVHDKBRKL
      &client_secret=02E41TTGAS4K2NNOWL5REL2UZ53WU2FW30THZYDMSHAV24XW`)
      .then(res => res.json())
      .then(results =>  {
        const venues = results.response.venues.map(venue=> {
          return {...venue, ...{isOpen: false}}
        })
        this.setState({ venues: venues });
      })
      .catch(function() {
        alert('Foursquare did not load, this app will not be functional')

      });
  }
  // passing the query change to app state
  filterVenues(newQuery) {
    this.setState({query: newQuery})
  }


  // marker / infowindow functions inspired by Forrest Walker's walkthrough, esp Object.assign()
  closeAllMarkers = () => {
    const markers = this.state.venues.map(marker => {
      marker.isOpen = false;
      return marker;
    });
    this.setState({ venues: Object.assign(this.state.venues, markers) });
  };

  toggleInfo = venue => {
    this.closeAllMarkers();
    venue.isOpen = true;
    this.setState({ venues: Object.assign(this.state.venues, venue) });
  };


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Brooklyn Music Venues</h1>
        </header>
        <ControlPanel
          {...this.state}
          filterVenues={this.filterVenues}
          handleListItemClick={this.toggleInfo}
        /> 
        <ConcertMap
          aria-label="Map"
          tabIndex={-1}
          {...this.state}
          handleMarkerClick={this.toggleInfo}
        />
      </div>
    );
  }
}

export default App;
