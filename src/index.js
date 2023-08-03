import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import router from "./router";
import { SystemProvider } from "./context";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <SystemProvider>
      <App>
        <RouterProvider router={router}></RouterProvider>
      </App>
    </SystemProvider>
  </React.StrictMode>
);
