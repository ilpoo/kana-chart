import * as React from "react";
import * as ReactDOM from "react-dom";
import Main from "./components/Main";

ReactDOM.render(<Main />, document.getElementById('app'));

(async () => {
  if("serviceWorker" in navigator) {
    const registration = await navigator.serviceWorker.register(`${window.location.pathname}worker.js`);
  }
})();
