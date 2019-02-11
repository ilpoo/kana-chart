import React from "react";
import styled from "@emotion/styled";
import { OptionDescription } from "../interfaces/OptionDescriptions";

const Label = styled("label")`
  display: block;
  padding-left: 10px;

  transition: background-color .5s;
  cursor: pointer;

  & > * {
    vertical-align: middle;
  }

  &:hover {
    background-color: rgba(128, 128, 128, .5);
  }
`;

const TextBlock = styled("div")`
  display: inline-block;
  max-width: calc(100% - 25px);
  padding: 10px 0;
`;

export interface CheckboxProps extends OptionDescription {
  changeOptions: Function;
  checked: boolean;
}

export default class Checkbox extends React.Component<
  CheckboxProps,
  {}
> {
  onCheck = () => {
    const {
      changeOptions,
      name,
      checked,
    } = this.props;
    changeOptions(name, !checked);
  }

  render() {
    const {name, label, title, checked, separate} = this.props;
    return (
      <>
        <Label
          htmlFor = {name}
          title = {title}
        >
          <input
            id = {name}
            type = "checkbox"
            checked = {checked}
            onChange = {this.onCheck}
          /> <TextBlock>{label}</TextBlock>
        </Label>
        {separate && <hr/>}
      </>
    );
  }
}
