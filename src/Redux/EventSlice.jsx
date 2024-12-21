import { createSlice } from "@reduxjs/toolkit";


const EventSlice = createSlice({
  name: "events",
  initialState: [],
  reducers: {

    addEvent: (state, action) => {
      state.push(action.payload); // Add a new event
    },
  },
});

export const { addEvent } = EventSlice.actions;
export default EventSlice.reducer;
