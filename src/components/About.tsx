import * as React from "react";
import Table from "./Table";

export default class Content extends React.Component<{}, {}> {
  render(){
    return (
      <div>
        <h1>About</h1>

        Credits
        <a href="http://gawron.sdsu.edu/crypto/lectures/hiragana.html">Frequency data</a> from San Diego Uniersity
        Writing guides for <a href="">hiragana</a> and <a href="">katakana</a> from Wikimedia creative commons:
          https://commons.wikimedia.org/wiki/File:Table_katakana.svg
          https://commons.wikimedia.org/wiki/File:Table_hiragana.svg
          https://commons.wikimedia.org/wiki/Hiragana
        Built using <a href="https://facebook.github.io/react/docs/why-react.html">React.js</a>
      </div>
    );
  }
}
