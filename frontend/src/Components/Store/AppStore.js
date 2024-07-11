import { createSlice } from "@reduxjs/toolkit";

const initialAppState = {
  collectionNames: [],
  searchResults: [],
  login:false
};

const appSlice = createSlice({
  name: "application",
  initialState: initialAppState,
  reducers: {
    setCollection(state, action) {
      state.collectionNames = action.payload;
    },
    setSearchResults(state, action) {

      state.searchResults = action.payload;
    },

    setLogin(state,action){
      state.login=!state.login
    }
  },
});

export const appActions = appSlice.actions;
export default appSlice.reducer;
