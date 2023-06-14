import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";

import Error from "./MyComponents/Common/Error";

// Authentication
import Login from "./MyComponents/Authentication/Login";
import Signup from "./MyComponents/Authentication/Signup";
import ForgotPassword from "./MyComponents/Authentication/Forgot-password";
import Thank_you from "./MyComponents/Authentication/Thank-you";
import PublicRoute from "./routing/PublicRoute";

import { Routes, Route } from "react-router-dom";
import store from "./store";

function App() {
  const [isToggle, setIsToggle] = useState(false);
  const [headerCompany, setHeaderCompany] = useState(null);

  const location = window.location;

  useEffect(() => {
    console.log({ headerCompany, location, storeState: store.getState() }, "--- Inside App()");
  }, [location, store]);

  return (
    <>
      <Routes>
          
        <Route
          exact
          path="/"
          element={
            // <PublicRoute>
            <Login />
            // </PublicRoute>
          }
        ></Route>
        <Route
          exact
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        ></Route>
        <Route
          exact
          path="/thank-you"
          element={
            <PublicRoute>
              <Thank_you />
            </PublicRoute>
          }
        ></Route>
        <Route
          exact
          path="/forgot-password"
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        ></Route>
        <Route
          // exact
          path="*"
          element={<Error />}
        ></Route>
      </Routes>

      <ToastContainer />
    </>
  );
}
export default App;
