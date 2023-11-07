import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Test from "./routes/Test.jsx";
import ErrorPage from "./routes/error-page.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: `/test/:user`,
    element: <Test />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
