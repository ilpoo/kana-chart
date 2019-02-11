import React from "react";
import Menu from "./Menu";
import Header from "./Header";
import Content from "./Content";
import fontLoaded from "../font-loaded";
import Checkbox from "./Checkbox";
import defaultOptions from "../defaultOptions";
import optionDescriptions from "../optionDescriptions";
import Options from "../interfaces/Options";

export interface MainStates {
  kyoukashoLoaded: boolean;
  options: Options;
}

export default class Main extends React.Component<
  {},
  MainStates
> {
  state: MainStates = {
    options: JSON.parse(localStorage.getItem("options") || JSON.stringify(defaultOptions)),
    kyoukashoLoaded: false,
  }

  componentDidMount() {
    const fontCheck = setInterval((() => {
      let fontChecks = 0;
      return () => {
        if (fontLoaded("Kyoukasho")) {
          this.setState({ kyoukashoLoaded: true });
          clearInterval(fontCheck);
        } else if (++fontChecks > 20) {
          clearInterval(fontCheck);
          console.log("Failed to load Kyouka.");
        }
      }
    })(), 200);
  }

  changeOptions = (name: string, bool: boolean) => {
    const options = JSON.parse(JSON.stringify(this.state.options));
    options[name] = bool;
    this.setState({ options: options });
    localStorage.setItem("options", JSON.stringify(options));
  }

  render() {
    return (
      <>
        <Header />
        <Content
          options = {this.state.options}
          kyoukashoLoaded = {this.state.kyoukashoLoaded}
        />
        <Menu>
          <div className = "menuTitle">
            <h1>Options   <ruby>設定<rt style = {{
              fontSize: 8,
            }}>せってい</rt></ruby></h1>
          </div>
          {optionDescriptions.map(option => (
            <Checkbox
              name = {option.name}
              label = {option.label}
              title = {option.title}
              separate = {option.separate}
              checked = {this.state.options[option.name]}
              changeOptions = {this.changeOptions}
              key = {option.name}
            />
          ))}
        </Menu>
      </>
    );
  }
}
