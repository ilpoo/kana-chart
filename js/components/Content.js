'use strict';
import React from "react";
import Table from './Table';

export default class Content extends React.Component{
	static propTypes={
		options: React.PropTypes.object,
	};

	render(){
		return (
			<article>
				<Table options={this.props.options}/>
			</article>
		);
	}
}
