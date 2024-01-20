import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../SideNavbar.css";
import CrudService from "../services/crud.service";
import Notes from "../services/note.service";
import { Outlet } from "react-router-dom";
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';


import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const SideNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState("50px");
  const [mainMargin, setMainMargin] = useState("0");

  const {
    currentUser,
    getBox,
    handleAddBox,
    handleDeleteBox,
    handleSave,
    changeInput,
    box,
    setBox,
    input,
    setInput,
  } = CrudService();

  const {
    notes,
    setNotes,
    noteInput,
    newLink,
    setNewLink,
    notesId,
    setNotesId,
    handleAddNote,
    handleDeleteNote,
    changeNoteInput,
    handleNoteSave,
  } = Notes();

  useEffect(() => {
    getBox();
  }, [isOpen]);

  // console.log("SideNavbar - note:", notes);
  const openNav = () => {
    setSidebarWidth("250px");
    setMainMargin("250px");
    setIsOpen(true);
  };

  function closeNav() {
    setSidebarWidth("50px");
    setMainMargin("0");
    setIsOpen(false);
  }

  function myFunction() {
    const burgerIcon = document.getElementById("burger-container");

    if (isOpen) {
      closeNav();
      burgerIcon.classList.toggle("change");
    } else {
      openNav();
      burgerIcon.classList.toggle("change");
    }
  }

  const [isEditing, setIsEditing] = useState(true);

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const drawerWidth = 240;

    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);
  
    const handleDrawerClose = () => {
      setIsClosing(true);
      setMobileOpen(false);
    };
  
    const handleDrawerTransitionEnd = () => {
      setIsClosing(false);
    };
  
    const handleDrawerToggle = () => {
      if (!isClosing) {
        setMobileOpen(!mobileOpen);
      }
    };
  

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? 'inboxicon' : 'mailicon'}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? '<InboxIcon />' : '<MailIcon />'}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <>
      <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Responsive drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

{/*         
      <div id="mySidebar" className="sidebar" style={{ width: sidebarWidth }}>
        <div className="burger" id="burger-container" onClick={myFunction}>
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </div>

        {isOpen ? (
          <div>
            <div>
            <button onClick={handleAddNote}>New Note</button>
            </div>
            <div>
            {notes.slice(1).map((item) => (
              <div key={item.id} id={item.id}>
                <div>
                <Link
                  to={`/profile/${currentUser.id}/${item.id}`}
                  style={{ color: "white", backgroundColor: "blue" }}
                  onClick={() => setNotesId(item.id)} // Pass a function to onClick
                >
                 {item.noteInput}
                </Link>
                
                <button onClick={() => handleDeleteNote(item.id)}>Delete + {item.id}</button>
              </div>
              </div>
            ))}
            </div>
          </div>
        ) : null}

        <div id="main"></div>
      </div> */}
      <Outlet />
    </>
  );
};

export default SideNavbar;
