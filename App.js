import React from "react";
import { legacy_createStore as createStore } from "redux";
import { Provider } from "react-redux";
import HomeScreen from "./Screens/HomeScreen";

const initialState = {
  action: "openMenu"
};

const reducer = (state = initialState, action) => {

  switch (action.type) {
    case "CLOSE_MENU":
      return { action: "closeMenu" };
    case "OPEN_MENU":
      return { action: "openMenu" };
    default:
      return state;
  }
};

const store = createStore(reducer);

const App = () => (
  <Provider store={store}>
    <HomeScreen/>
  </Provider>
);

export default App;
