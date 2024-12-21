import { configureStore } from "@reduxjs/toolkit";
import eventReducer from "../Redux/EventSlice";

const Store = configureStore({
  reducer: {
    events: eventReducer, 
  },
});

export default Store;
