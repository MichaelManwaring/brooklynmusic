import React, { Component } from 'react';

class VenueList extends Component {
	render(){
		return(
			<div className="venue-list">
				<ul>
					{this.props.venues && this.props.venues.map(venue => (
						<li
							key={venue.id}
							onClick={() => this.props.handleListItemClick(venue)}
						>{venue.name}</li>
					))}
				</ul>
			</div>
		)
	}
}

export default VenueList