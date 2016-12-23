'use strict';
import React from "react";

export default class Checkbox extends React.Component{
	static propTypes={
		changeOptions: React.PropTypes.func,
		name: React.PropTypes.string,
		label: React.PropTypes.string,
		title: React.PropTypes.string,
		separate: React.PropTypes.bool,
		checked: React.PropTypes.bool,
	}

	onCheck(){
		const { name, checked } = this.props;
		this.props.changeOptions(name, !checked);
	}

	render(){
		const {name, label, title, checked, separate} = this.props;
		return (
			<div>
				<label for={name} title={title}>
					<input 
						id={name} 
						type="checkbox" 
						checked={checked} 
						onChange={this.onCheck.bind(this)} 
					/> {label}
				</label>
				{separate&&<hr/>}
			</div>
		);
	}
}
