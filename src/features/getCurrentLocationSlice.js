import { createSlice } from "@reduxjs/toolkit";

const currentLocationCooardinatesSlice = createSlice({
  name: "currentLocationCooardinates",
  initialState: {
    currentLocationCooardinates: [],
  },
  reducers: {
    setCurrentLocationCooardinates: (state, action) => {
      state.currentLocationCooardinates = action.payload;
    }
  },
});

export const { setCurrentLocationCooardinates } = currentLocationCooardinatesSlice.actions;
export const cooardinatesData = (state) => state.currentLocationCooardinates.currentLocationCooardinates;
export const currentLocationCooardinatesReducer = currentLocationCooardinatesSlice.reducer;