import React, { Component } from 'react';
import VenueList from './VenueList'

class ControlPanel extends Component {
	handleChange = e => {
		this.props.filterVenues(e.nativeEvent.target.value);
	}

	render(){
		return(
			<div className='control-panel'>
				<input
					tabIndex={1}
					type={"search"}
					id={"search"}
					placeholder={"Search Venues..."}
					onChange={this.handleChange}
				/>
				<VenueList {...this.props}/>
			</div>
		)
	}
}

export default ControlPanel