'use strict';
import React from "react";
import FontAwesome from 'react-fontawesome';

export default class Header extends React.Component{
  render(){
    return (
      <header>
        <div class="menuTitle">
          <label for="menubutton">
            <FontAwesome name='cog'/>
          </label><h1>Japanese syllabary</h1>
        </div>
      </header>
    );
  }
}
