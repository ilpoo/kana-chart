import * as React from "react";

export default class Header extends React.Component<{}, {}> {
  render(){
    return (
      <header>
        <div className="menuTitle">
          <h1>Kana Chart</h1>
        </div>
      </header>
    );
  }
}
