import { createSlice } from "@reduxjs/toolkit";
const AppSlice = createSlice({
  name: "AppSlice",
  initialState: {
    rand: Math.floor(Math.random() * (20 - 10 + 1)),
    isNavBarVisible: true,
    isFooterVisible: true,
    url: {},
    genres: {},
    isDropDownVisible: false,
  },
  reducers: {
    getUrl: (state, action) => {
      state.url = action.payload;
    },
    getGenres: (state, action) => {
      state.genres = action.payload;
    },
    setIsNavBarVisible: (state, action) => {
      state.isNavBarVisible = action.payload;
    },
    setIsFooterVisible: (state, action) => {
      state.isFooterVisible = action.payload;
    },
    setIsDropDownVisible: (state, action) => {
      state.isDropDownVisible = action.payload;
    },
  },
});

export const {
  getUrl,
  getGenres,
  setIsNavBarVisible,
  setIsFooterVisible,
  setIsDropDownVisible,
} = AppSlice.actions;
export default AppSlice.reducer;
