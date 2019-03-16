import React, { memo } from "react";
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



export default memo(function Checkbox (
  {
    name,
    label,
    title,
    checked,
    separate,
    changeOptions,
    kyoukashoFailed,
  }: CheckboxProps,
) {
  const disabled = (name !== "handwritten"
    ? false
    : kyoukashoFailed
  );

  function onCheck () {
    changeOptions(name, !checked);
  }

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
          onChange = {onCheck}
          disabled = {disabled}
        /> <TextBlock>{label}</TextBlock>
      </Label>
      {separate && <hr/>}
    </>
  );
});
