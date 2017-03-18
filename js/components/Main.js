'use strict';
import React from "react";
import Menu from './Menu';
import Header from './Header';
import Content from './Content';
import fontLoaded from '../font-loaded';
import Checkbox from './Checkbox';
import optionsData from '../options.json';

export default class Main extends React.Component{
  state={
    options: JSON.parse(localStorage.getItem('options') || JSON.stringify(optionsData.defaultOptions)),
    kyoukashoLoaded: false,
  }

  componentDidMount(){
    const fontCheck = setInterval((()=>{
      let fontChecks = 0;
      return ()=>{
        if(fontLoaded('Kyoukasho')){
          this.setState({kyoukashoLoaded: true});
          clearInterval(fontCheck);
        }else if(++fontChecks>20){
          clearInterval(fontCheck);
          console.log('Failed to load Kyouka.');
        }
      }
    })(), 200);
  }

  changeOptions = (name, bool) => {
    const options = JSON.parse(JSON.stringify(this.state.options));
    options[name] = bool;
    this.setState({options: options});
    localStorage.setItem('options',JSON.stringify(options));
  }

  render(){
    return(
      <div>
        <Header />
        <Content 
          options={this.state.options}
          kyoukashoLoaded={this.state.kyoukashoLoaded}
        />
        <Menu>
          <div class="menuTitle">
            <h1>Options</h1>
          </div>
          {optionsData.data.map(option=>(
            <Checkbox 
              name={option.name} 
              label={option.label} 
              title={option.title} 
              separate={option.separate} 
              checked={this.state.options[option.name]} 
              changeOptions={this.changeOptions}
              key={option.name}
            />
          ))}
        </Menu>
      </div>
    );
  }
}
