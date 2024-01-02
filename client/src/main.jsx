import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Test from "./routes/Test.jsx";
import ErrorPage from "./routes/error-page.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { NoteProvider } from "./components/NoteContext.jsx";

// import reportWebVitals from './reportWebVitals'




// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: `/login`,
//     element: <Login />,
//   },
// ]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <NoteProvider>
    <App />
    </NoteProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// reportWebVitals();
