// reducers/index.js

import { combineReducers } from "redux";
import {legacy_createStore as createStore} from 'redux'
import { walletInfoSlice } from "./slice/walletInfo";

// import other slices as needed

const rootReducer = combineReducers({
  walletInfo: walletInfoSlice.reducer,
  // add other slices here
});

const store = createStore(rootReducer);

export default store;
