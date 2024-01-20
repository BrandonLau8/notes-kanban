import React from "react";
import { Link as RouterLink} from "react-router-dom";

import { AppBar, Box, Toolbar, Link } from "@mui/material";

const Navbar = ({
  isAuthenticated,
  showModeratorBoard,
  showAdminBoard,
  currentUser,
  logOut,
}) => {
  // console.log("isAuthenticated:", isAuthenticated);
  // console.log("showModeratorBoard:", showModeratorBoard);
  // console.log("showAdminBoard:", showAdminBoard);
  // console.log("currentUser:", currentUser);
  return (
    <Box sx={{flexGrow:1}}>
      <AppBar position="static">
        <Toolbar>
          {/* <nav className="navbar navbar-expand navbar-dark bg-dark"> */}
          <Link component={RouterLink} to={"/"} sx={{color: 'white', flexGrow:1}}>
            Kanban Notes
          </Link>
          <div className="navbar-nav mr-auto">
            <Link component={RouterLink} to={"/home"} className="nav-link">
              Home
            </Link>

            {showModeratorBoard && (
              <li className="nav-item">
                <Link component={RouterLink} to={"/mod"} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link component={RouterLink} to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

            {isAuthenticated && (
              <li className="nav-item">
                <Link component={RouterLink} to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )}
          </div>

          {isAuthenticated ? (
            <div className="navbar-nav ml-auto">
              
                <Link component={RouterLink} to={`/profile/${currentUser?.id}`} className="nav-link">
                  {currentUser.username}
                </Link>
              
              
                <a href="/login" className="nav-link" onClick={logOut}>
                  LogOut
                </a>
              
            </div>
          ) : (
            <Box>
              <Link component={RouterLink} to={"/login"} className="nav-link" sx={{color: 'white'}}>
                Login
              </Link>

              <Link component={RouterLink} to={"/register"} className="nav-link" sx={{color: 'white', ml:3}}>
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
