import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  details: {},
};

export const sbcSlice = createSlice({
  name: "sbc",
  initialState,
  reducers: {
    setSbc: (state, action) => {
      state.details = { ...action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSbc } = sbcSlice.actions;

export default sbcSlice.reducer;
