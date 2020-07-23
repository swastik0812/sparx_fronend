import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import Routes from "./Routes";
import * as serviceWorker from "./serviceWorker";
import routeReducer from "./reducer";
import contactReducer from "./app/containers/Contact/reducer";

const rootReducer = combineReducers({
  Route: routeReducer,
  Contact: contactReducer,
});
const store = createStore(rootReducer);

ReactDOM.render(
  <React.StrictMode>
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Provider store={store}>
        <Routes />
      </Provider>
    </MuiPickersUtilsProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
