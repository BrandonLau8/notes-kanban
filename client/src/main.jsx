import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Test from "./routes/Test.jsx";
import ErrorPage from "./routes/error-page.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login.jsx";
import Tweet from "./components/Tweet.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: `/tweets`,
    element: <Tweet />,
  },
  {
    path: `/login`,
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
