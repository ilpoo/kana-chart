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
  kyoukashoFailed: boolean;
  options: Options;
}

export default class Main extends React.Component<
  {},
  MainStates
> {
  state: MainStates = {
    options: JSON.parse(localStorage.getItem("options") || JSON.stringify(defaultOptions)),
    kyoukashoLoaded: false,
    kyoukashoFailed: false,
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
          this.setState({
            kyoukashoFailed: true,
          });
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
              top: 4,
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
              kyoukashoFailed = {this.state.kyoukashoFailed}
            />
          ))}
          {this.state.kyoukashoFailed && <div style = {{margin: "0 10px"}}><i>Failed to load typeface for hand-written text. <code>ctrl+R</code> to try again.</i></div>}
        </Menu>
      </>
    );
  }
}
