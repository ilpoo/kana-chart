import React from "react";
import DOM from "react-dom";
import Main from "./components/Main";

DOM.render(<Main />, document.getElementById('app'));

(async () => {
  if("serviceWorker" in navigator) {
    const registration = await navigator.serviceWorker.register(
      `${window.location.pathname}worker.js`,
    );
  }
})();
