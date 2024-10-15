import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log(
          "ServiceWorker registration successful with scope: ",
          registration.scope
        );
      })
      .catch((error) => {
        console.log("ServiceWorker registration failed: ", error);
      });
  });
}
