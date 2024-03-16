import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  details: {},
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setPlayer: (state, action) => {
      state.details = { ...action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPlayer } = playerSlice.actions;

export default playerSlice.reducer;
