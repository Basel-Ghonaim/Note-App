import { createSlice } from "@reduxjs/toolkit";

let notesSlice = createSlice({
  name: "note-slice",
  initialState: { data: [], filteredData: [], favorites: [], item: {}, singleItem: {} },
  reducers: {
    create: (state, action) => {
      state.data.push(action.payload);
      state.filteredData = [...state.data];
    },
    read: (state, action) => {
      state.data = action.payload;
      state.filteredData = [...state.data];
    },
    update: (state, action) => {
      state.item = action.payload;
      state.singleItem = action.payload;
      let index = state.data.findIndex((ele) => ele.id === action.payload.id);
      state.data[index] = action.payload;
      if (state.data[index].favorite) {
        let index = state.favorites.findIndex(
          (ele) => ele.id === action.payload.id
        );
        state.favorites[index] = action.payload;
      }
      state.filteredData = [...state.data];
    },
    delete: (state, action) => {
      let filtered = state.data.filter((ele) => ele.id !== action.payload);
      state.data = filtered;
      state.favorites = state.favorites.filter(
        (ele) => ele.id !== action.payload
      );
      state.filteredData = [...state.data];
    },
    favorite: (state, action) => {
      let index = state.data.findIndex(
        (element) => element.id === action.payload.id
      );
      state.data[index] = action.payload;
      state.item = action.payload;
      state.singleItem = action.payload;
      if (action.payload.favorite) {
        if (!state.favorites.some((ele) => ele.id === action.payload.id)) {
          state.favorites.push(state.data[index]);
        }
      }
      if (action.payload.favorite === false) {
        state.favorites = state.favorites.filter(
          (ele) => ele.id !== action.payload.id
        );
      }
      state.filteredData = [...state.data];
    },
    setItem: (state, action) => {
      state.item = state.data.find((ele) => ele.id === action.payload);
      state.filteredData = [...state.data];
    },
    setSingle: (state, action) => {
      state.singleItem = action.payload
    },
    filterBySearch: (state, action) => {
      state.filteredData = state.data.filter(
        (ele) =>
          ele.title.includes(action.payload) ||
          ele.details.includes(action.payload)
      );
    },
    filterByType: (state, action) => {
      if (action.payload === "All") {
        state.filteredData = [...state.data];
      } else {
        state.filteredData = state.data.filter(
          (ele) => ele.type === action.payload
        );
      }
    },
  },
});

export const notesReducer = notesSlice.reducer;
export const notesActions = notesSlice.actions;
