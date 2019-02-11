import { ReactElement } from "react";

export interface OptionDescription {
  name: string;
  label: string | ReactElement<any>;
  title: string;
  separate?: boolean;
}

export default interface OptionDescriptions extends Array<OptionDescription> { }
