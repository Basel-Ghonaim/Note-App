import { configureStore } from "@reduxjs/toolkit";
import { notesReducer } from "./note-slice";

export const reduxStore = configureStore({
  reducer: {
    notes: notesReducer,
  },
});
