import React, { Component } from 'react';

class VenueList extends Component {
	render(){
		return(
			<div className="venue-list">
				<ul>
					{this.props.venues && this.props.venues
						.filter(venue => venue.name.toLowerCase().includes(this.props.query.toLowerCase()))
						.map((venue, index) => (
						<li
                    		tabIndex={index+2}
							key={venue.id}
							onClick={() => this.props.handleListItemClick(venue)}
						>{venue.name}</li>
					))}
					{this.props.venues.length === 0 && (
						<li>No Venues Loaded...</li>
					)}
				</ul>
			</div>
		)
	}
}

export default VenueList