import * as React from "react";
import { OptionDescription } from "../interfaces/OptionDescriptions";
import styled from "styled-components";

const Label = styled.label`
  display: block;
`;

export interface CheckboxProps extends OptionDescription {
  changeOptions: Function;
  checked: boolean;
}

export default class Checkbox extends React.Component<CheckboxProps, {}> {
  onCheck(){
    const { name, checked } = this.props;
    this.props.changeOptions(name, !checked);
  }

  render(){
    const {name, label, title, checked, separate} = this.props;
    return (
      <React.Fragment>
        <Label htmlFor={name} title={title}>
          <input
            id={name}
            type="checkbox"
            checked={checked}
            onChange={this.onCheck.bind(this)}
          /> {label}
        </Label>
        {separate && <hr/>}
      </React.Fragment>
    );
  }
}
