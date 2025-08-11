import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from "react-dom/client";
import "./resources/CSS/custom.css";
import { BrowserRouter } from "react-router-dom";
import NoteRoutes from "./routes/NoteRoutes";
import { Provider } from "react-redux";
import { reduxStore } from "./redux/redux-store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={reduxStore}>
    <BrowserRouter>
      <NoteRoutes />
    </BrowserRouter>
  </Provider>
);
