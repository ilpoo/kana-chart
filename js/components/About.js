'use strict';
import React from "react";
import Table from './Table';

export default class Content extends React.Component{
	static propTypes= {
		options: React.PropTypes.object,
	};

	render(){
		return (
			<div>
				<h1>About</h1>

				

				Credits
				<a src="http://gawron.sdsu.edu/crypto/lectures/hiragana.html">Frequency data</a> from San Diego Uniersity
				Writing guides for <a src="">hiragana</a> and <a src="">katakana</a> from Wikimedia creative commons:
					https://commons.wikimedia.org/wiki/File:Table_katakana.svg
					https://commons.wikimedia.org/wiki/File:Table_hiragana.svg
					https://commons.wikimedia.org/wiki/Hiragana
				Built using <a src="https://facebook.github.io/react/docs/why-react.html">React.js</a>
			</div>
		);
	}
}
