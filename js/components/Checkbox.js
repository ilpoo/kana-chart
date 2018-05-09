import React from "react";

export default class Checkbox extends React.Component{
  onCheck(){
    const { name, checked } = this.props;
    this.props.changeOptions(name, !checked);
  }

  render(){
    const {name, label, title, checked, separate} = this.props;
    return (
      <div>
        <label htmlFor={name} title={title}>
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
