import React, { useState, useEffect, memo } from "react";
import Menu from "./Menu";
import Header from "./Header";
import Content from "./Content";
import fontLoaded from "../helpers/font-loaded";
import Checkbox from "./Checkbox";
import defaultOptions from "../defaultOptions";
import optionDescriptions from "../optionDescriptions";
import Options from "../interfaces/Options";

export interface MainStates {
  kyoukashoLoaded: boolean;
  kyoukashoFailed: boolean;
  options: Options;
}

const savedOptions: Options = JSON.parse(localStorage.getItem("options") || JSON.stringify(defaultOptions))

export default memo(function Main () {
  const [options, setOptions] = useState(savedOptions);
  const [kyoukashoLoaded, setKyoukashoLoaded] = useState(false);
  const [kyoukashoFailed, setKyoukashoFailed] = useState(false);

  useEffect(
    () => {
      let fontChecks = 0;
      const fontCheck = setInterval(() => {
        if (fontLoaded("Kyoukasho")) {
          clearInterval(fontCheck);
          setKyoukashoLoaded(true);
        } else if (++fontChecks > 20) {
          clearInterval(fontCheck);
          setKyoukashoFailed(true);
        }
      }, 200)
    },
    [],
  );

  const changeOptions = (
    name: string,
    bool: boolean,
  ) => {
    const optionsClone = JSON.parse(JSON.stringify(options));
    optionsClone[name] = bool;
    setOptions(optionsClone);
    localStorage.setItem("options", JSON.stringify(optionsClone));
  }

  return (
    <>
      <Header />
      <Content
        options = { options }
        kyoukashoLoaded = { kyoukashoLoaded }
      />
      <Menu>
        <div className = "menuTitle">
          <h1>Options   <ruby>設定<rt style = {{
            fontSize: 8,
            top: 4,
          }}>せってい</rt></ruby></h1>
        </div>
        { optionDescriptions.map(option => (
          <Checkbox
            name = { option.name }
            label = { option.label }
            title = { option.title }
            separate = { option.separate }
            checked = { options[option.name] }
            changeOptions = { changeOptions }
            key = { option.name }
            kyoukashoFailed = { kyoukashoFailed }
          />
        )) }
        { kyoukashoFailed &&
          <div
            style = {{margin: "0 10px"}}
          >
            <i>Failed to load typeface for hand-written text. <code>ctrl+R</code> to try again.</i>
          </div>
        }
      </Menu>
    </>
  );
});
