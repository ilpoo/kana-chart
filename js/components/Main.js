'use strict';
import React from "react";
import Menu from './Menu';
import Header from './Header';
import Content from './Content';
import fontLoaded from '../font-loaded';

export default class Main extends React.Component{
  defaultOptions={
    hiragana: true,
    romanji: true,
    katakana: false,
    pronunciation: false,
    diacritics: false,
    digraphs: false,
    strokes: false,
    exceptions: true,
    similar: true,
    frequency: true,
    transcription: false,
    handwritten: false,
  }

  state={
    options: JSON.parse(localStorage.getItem('options') || JSON.stringify(this.defaultOptions)),
    kyoukaSupport: false,
  }

  componentDidMount(){
    const fontCheck = setInterval((()=>{
      let fontChecks = 0;
      return ()=>{
        if(fontLoaded('Kyouka')){
          this.setState({kyoukaSupport: true});
          clearInterval(fontCheck);
        }else if(++fontChecks>20){
          clearInterval(fontCheck);
          console.log('Failed to load Kyouka.');
        }
      }
    })(), 200);
  }

  changeOptions(name, bool) {
    const options = JSON.parse(JSON.stringify(this.state.options));
    options[name] = bool;
    this.setState({options: options});
    localStorage.setItem('options',JSON.stringify(options));
  }

  render(){
    return(
      <div>
        <input type="checkbox" id="menuToggle" />
        <Header />
        <label for="menuToggle" id="clickOutsideNav"></label>
        <Menu 
          options={this.state.options} 
          kyoukaSupport={this.state.kyoukaSupport}
          changeOptions={this.changeOptions.bind(this)}
        />
        <Content 
          options={this.state.options}
          kyoukaSupport={this.state.kyoukaSupport}
        />
        <label for="menuToggle" id="menuButton"></label>
      </div>
    );
  }
}
