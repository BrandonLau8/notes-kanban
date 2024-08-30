import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../SideNavbar.css";
import CrudService from "../services/crud.service";
import Notes from "../services/note.service";
import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

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

  return (
    <>
      <Drawer
        sx={{
          width: 350,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 350,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <ListItemButton variant='text' onClick={handleAddNote}><Typography variant="h1" color='textPrimary' fontSize={20}>New Note</Typography></ListItemButton>
            {notes.slice(1).map((item) => (
              <ListItem
                key={item.id}
                id={item.id}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="comments"
                    onClick={() => handleDeleteNote(item.id)}
                  >
                    <ClearIcon />
                  </IconButton>
                }
              >
                <ListItemButton
                  to={`/profile/${currentUser.id}/${item.id}`}
                  onClick={() => setNotesId(item.id)} // Pass a function to onClick
                >
                  <ListItemText>{item.noteInput}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Outlet />
    </>
  );
};

export default SideNavbar;
