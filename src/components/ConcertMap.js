import React, { Component } from 'react';
import { withScriptjs, GoogleMap, Marker, withGoogleMap, InfoWindow} from "react-google-maps"
import { compose, withProps } from "recompose"
import foursquare from '../powered-by-foursquare-grey.png'


// calling google API in this component keeps the app.js more readable
// much credit to the react-google-maps documentation
const MapContainer = compose(
	withProps(props => {
		return {
    		toggleMarker: props.toggleMarker,
			googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCEElK09VcL3tWpYSzsMdPz7LYaa9XPCBs",
	      	loadingElement: <div style={{ height: `90%` }} />,
	      	containerElement: <div style={{ height: `90vh`, width: `100%`}} />,
	      	mapElement: <div style={{ height: `100%` }} />
		}
	}),
	withScriptjs,
	withGoogleMap
)((props) =>
	<GoogleMap
	    defaultZoom={13}
	    defaultCenter={{ lat: 40.6975, lng: -73.9635 }}
	>
		{props.venues && props.venues
			.filter(venue => venue.name.toLowerCase().includes(props.query.toLowerCase()))
			.map((marker)=>
	  		<Marker
	  			key={marker.id}
	  			position={{lat: marker.location.lat, lng: marker.location.lng}}
	  			onClick={() => props.handleMarkerClick(marker)}
	  			animation={
              		marker.isOpen === true
                	? window.google.maps.Animation.BOUNCE
                	: window.google.maps.Animation.NONE
            	}>
	  			{marker.isOpen && (
	  				<InfoWindow>
	  					<div>
	  						<h2>
	  							<a target="_blank" rel="noopener noreferrer" href={'https://www.google.com/search?q=' + marker.name +' '+ marker.categories[0].name + '&btnI'}>{marker.name}</a>
	  						</h2>
		  					<p>a {marker.categories[0].name} at {marker.location.address}</p>
		  					{marker.events && (
		  						<p>Next event: {marker.events.summary}</p>
		  					)}
		  					<img src={foursquare} alt='Powered by Four Square' width='130px'/>
	  					</div>
	  				</InfoWindow>
	  			)}
	  		</Marker>
	  	)}
	</GoogleMap>
)

class ConcertMap extends Component {
	render() {
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