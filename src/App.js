import React, { Component } from 'react';
import './App.css';

import ConcertMap from './components/ConcertMap'
import ControlPanel from './components/ControlPanel'

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      venues: [],
      markers: []
    }

  }

  // Forrest Handle Functions
  closeAllMarkers = () => {
    const markers = this.state.markers.map(marker => {
      marker.isOpen = false;
      return marker;
    });
    this.setState({ markers: Object.assign(this.state.markers, markers) });
  };

  handleMarkerClick = marker => {
    this.closeAllMarkers();
    marker.isOpen = true;
    this.setState({ markers: Object.assign(this.state.markers, marker) });
  };

  handleListItemClick = venue => {
    const marker = this.state.markers.find(marker => marker.key === venue.id);
    this.handleMarkerClick(marker);
  };

  componentDidMount(){
    fetch(`https://api.foursquare.com/v2/venues/search?v=20180323
      &intent=browse
      &near=Brooklyn
      &categoryId=5032792091d4c4b30a586d5c,4bf58dd8d48988d1e5931735
      &client_id=WT5DUCMADRKG4KK4E413T1XJMNAUAVSF0SNRS3JQVHDKBRKL
      &client_secret=02E41TTGAS4K2NNOWL5REL2UZ53WU2FW30THZYDMSHAV24XW`)
      .then(res => res.json())
      // .then(data => this.setState({ venues: data.response.venues }))
      // .then(data => this.setState({ markers: data.response.venues.map(venue => {
      .then(results =>  {
        this.setState({ venues: results.response.venues })
        const markers = results.response.venues.map(venue=> {
          return {
            lat: venue.location.lat,
            lng: venue.location.lng,
            isOpen: false,
            isVisible: true,
            key: venue.id
          }
        })
        this.setState({ markers: markers });
      })
      .catch(function() {
        console.log('Bad foursquare Fetch')
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Brooklyn Music Venues</h1>
        </header>
        <ControlPanel
          {...this.state}
          handleListItemClick={this.handleListItemClick}
        /> 
        <ConcertMap
          {...this.state}
          toggleMarker={this.handleMarkerClick}
        />
      </div>
    );
  }
}

export default App;
