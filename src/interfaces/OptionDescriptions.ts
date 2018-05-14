export interface OptionDescription {
  name: string,
  label: string,
  title: string,
  separate?: boolean,
}

export default interface OptionDescriptions extends Array<OptionDescription> { }
