import React from "react";
import styled from "@emotion/styled";
import { OptionDescription } from "../interfaces/OptionDescriptions";

const Label = styled("label")<{
  disabled: boolean;
}>`
  display: block;
  padding-left: 10px;

  transition: background-color .5s;
  cursor: pointer;

  ${props => props.disabled && "opacity: .5;"}

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
  kyoukashoFailed: boolean;
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
    const disabled = (name !== "handwritten"
      ? false
      : this.props.kyoukashoFailed
    );
    return (
      <>
        <Label
          htmlFor = {name}
          title = {title}
          disabled = {disabled}
        >
          <input
            id = {name}
            type = "checkbox"
            checked = {disabled ? false : checked}
            onChange = {this.onCheck}
            disabled = {disabled}
          /> <TextBlock>{label}</TextBlock>
        </Label>
        {separate && <hr/>}
      </>
    );
  }
}
