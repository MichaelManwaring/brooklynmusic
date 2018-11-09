import React, { Component } from 'react';
import VenueList from './VenueList'

class ControlPanel extends Component {



	filterVenues(){}

	render(){
		return(
			<div>
				<input
					type={"search"}
					id={"search"}
					placeholder={"Filter Venues"}
					onChange={this.filterVenues}
				/>
				<VenueList {...this.props}/>
			</div>
		)
	}
}

export default ControlPanel