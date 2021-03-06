//index.js skeleton
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxPromise from "redux-promise";
import { BrowserRouter } from "react-router-dom";

import App from "./components/app";
import reducers from "./reducers";

export const transitionSetting = "opacity 0.6s .1s, transform 0.6s";

//log current redux state for development purposes
const logger = store => next => action => {
  console.group(action.type);
  console.info("dispatching", action);
  let result = next(action);
  console.log("next state", store.getState());
  console.groupEnd(action.type);
  return result;
};

const createStoreWithMiddleware = applyMiddleware(ReduxPromise, logger)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("container")
);

if (process.env.NODE_ENV === "development") {
  // if (module.hot) {
  //   module.hot.accept();
  // }
  console.log("development");
} else if (process.env.NODE_ENV === "production") {
  console.log("production");
}
