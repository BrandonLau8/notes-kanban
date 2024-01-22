import React from "react";
import { Link as RouterLink } from "react-router-dom";

import { AppBar, Box, Toolbar, Link } from "@mui/material";
import zIndex from "@mui/material/styles/zIndex";

const Navbar = ({
  isAuthenticated,
  showModeratorBoard,
  showAdminBoard,
  currentUser,
  logOut,
}) => {
  return (
    <Box sx={{ flexGrow: 1, zIndex: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Link
            component={RouterLink}
            to={"/"}
            sx={{ color: "white", flexGrow: 1 }}
          >
            Kanban Notes
          </Link>
          <div className="navbar-nav mr-auto">
            <Link component={RouterLink} to={"/home"} className="nav-link">
              Home
            </Link>
          </div>

          {isAuthenticated ? (
            <div className="navbar-nav ml-auto">
              <Link
                component={RouterLink}
                to={`/profile/${currentUser?.id}`}
                className="nav-link"
                sx={{ color: "whitesmoke", mr: 3 }}
              >
                {currentUser.username}
              </Link>

              <Link
                component={RouterLink}
                to="/login"
                className="nav-link"
                onClick={logOut}
                sx={{color:'whitesmoke'}}
              >
                LogOut
              </Link>
            </div>
          ) : (
            <Box>
              <Link
                component={RouterLink}
                to={"/login"}
                className="nav-link"
                sx={{ color: "white" }}
              >
                Login
              </Link>

              <Link
                component={RouterLink}
                to={"/register"}
                className="nav-link"
                sx={{ color: "white", ml: 3 }}
              >
                Sign Up
              </Link>
            </Box>
          )}
          {/* </nav> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
