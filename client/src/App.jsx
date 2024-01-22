import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import ProfileHeader from "./components/ProfileHeader";
import Notes from "./components/Boxes";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";

// import AuthVerify from "./common/AuthVerify";
import EventBus from "./common/EventBus";
import Roles from "./components/Roles";
import SideNavbar from "./components/SideNavbar";

import CssBaseline from "@mui/material/CssBaseline";
import { Box, Grid } from "@mui/material";

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  useEffect(() => {
    console.log("Executing useEffect");
    const fetchData = async () => {
      try {
        setLoading(true);

        const user = await AuthService.getCurrentUser();
        // console.log("Fetched user data:", user);

        if (user) {
          setCurrentUser((prevUser) => ({ ...prevUser, ...user }));
          setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
          setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
        } else {
          // User is not authenticated, handle accordingly
          setCurrentUser(undefined);
          setShowModeratorBoard(false);
          setShowAdminBoard(false);
        }

        EventBus.on("logout", () => {
          logOut();
        });
        setLoading(false);
        return () => {
          EventBus.remove("logout");
        };
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [location]);

  const logOut = async () => {
    await AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  return (
    <Box>
      <CssBaseline />
      <div>
        <Navbar
          isAuthenticated={!!currentUser}
          showModeratorBoard={showModeratorBoard}
          showAdminBoard={showAdminBoard}
          currentUser={currentUser}
          logOut={logOut}
        />

        <div>
          <Routes>
            <Route exact path={"/"} element={<Home />} />
            <Route exact path={"/home"} element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />

            <Route path="/profile/:userId/*" element={<Profile />} />

            <Route path="/user" element={<BoardUser />} />
            <Route path="/mod" element={<BoardModerator />} />
            <Route path="/admin" element={<BoardAdmin />} />
          </Routes>

          {/* <Grid container spacing={2}>
          <Routes>
         
          </Routes>
          </Grid> */}
        </div>

        {/* <AuthVerify logOut={logOut}/> */}
      </div>
    </Box>
  );
};

export default App;
