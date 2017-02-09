'use strict';
import React from "react";
import Table from './Table';

export default class Content extends React.Component{
	render(){
		return (
			<article>
				<Table options={this.props.options}/>
			</article>
		);
	}
}
