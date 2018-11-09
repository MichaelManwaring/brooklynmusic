import React, { Component } from 'react';
import { withScriptjs, GoogleMap, Marker, withGoogleMap, InfoWindow} from "react-google-maps"


class ConcertMap extends Component {
	render() {
		const MapContainer = withScriptjs(withGoogleMap(props => (
		  <GoogleMap
		    defaultZoom={13}
		    defaultCenter={{ lat: 40.6975, lng: -73.9635 }}
		  >
		  {props.markers && props.markers.map((marker)=>
		  	<Marker
		  		key={marker.key}
		  		position={{lat: marker.lat, lng: marker.lng}}
		  		onClick={() => props.toggleMarker(marker)}>
		  		{marker.isOpen && (
		  			<InfoWindow><p>{marker.key}</p></InfoWindow>
		  			)}
		  	</Marker>
		  	)}
		  </GoogleMap>
		)));


		return(
	      <div className='map-container'>
	        <MapContainer
	        	{...this.props}
	        	isMarkerShown
				googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCEElK09VcL3tWpYSzsMdPz7LYaa9XPCBs"
	          	loadingElement={<div style={{ height: `90%` }} />}
	          	containerElement={ <div style={{ height: `90vh`, width: `100%`}} /> }
	          	mapElement={ <div style={{ height: `100%` }} /> }
	        />
	      </div>
		);
	}
};

export default ConcertMap