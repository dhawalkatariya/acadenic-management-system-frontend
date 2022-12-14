import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import createStore from "./store/store";
import { Provider } from "react-redux";
import { AUTH_SUCCESS } from "./store/actions/actions";

const store = createStore();

if (localStorage.getItem("key")) {
  store.dispatch({
    type: AUTH_SUCCESS,
    key: localStorage.getItem("key"),
    details: JSON.parse(localStorage.getItem("details")),
  });
}
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
