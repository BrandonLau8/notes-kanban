import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Box } from '@mui/material';

const Navbar = ({ isAuthenticated, showModeratorBoard, showAdminBoard, currentUser, logOut }) => {
    // console.log("isAuthenticated:", isAuthenticated);
    // console.log("showModeratorBoard:", showModeratorBoard);
    // console.log("showAdminBoard:", showAdminBoard);
    // console.log("currentUser:", currentUser);
    return (
      <Box sx={{flexGrow:1}}>
        <AppBar position='static'>
    <nav className="navbar navbar-expand navbar-dark bg-dark">
    <Link to={"/"} className="navbar-brand">
      Kanban Notes
    </Link>
    <div className="navbar-nav mr-auto">
      <li className="nav-item">
        <Link to={"/home"} className="nav-link">
          Home
        </Link>
      </li>

      {showModeratorBoard && (
        <li className="nav-item">
          <Link to={"/mod"} className="nav-link">
            Moderator Board
          </Link>
        </li>
      )}

      {showAdminBoard && (
        <li className="nav-item">
          <Link to={"/admin"} className="nav-link">
            Admin Board
          </Link>
        </li>
      )}

      {isAuthenticated && (
        <li className="nav-item">
          <Link to={"/user"} className="nav-link">
            User
          </Link>
        </li>
      )}
    </div>

    {isAuthenticated ? (
      <div className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link to={`/profile/${currentUser?.id}`} className="nav-link">
            {currentUser.username}
          </Link>
        </li>
        <li className="nav-item">
          <a href="/login" className="nav-link" onClick={logOut}>
            LogOut
          </a>
        </li>
      </div>
    ) : (
      <div className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link to={"/login"} className="nav-link">
            Login
          </Link>
        </li>

        <li className="nav-item">
          <Link to={"/register"} className="nav-link">
            Sign Up
          </Link>
        </li>
      </div>
    )}
  </nav>
  </AppBar>
  </Box>
  );
};

export default Navbar;