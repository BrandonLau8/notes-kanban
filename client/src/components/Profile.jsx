import React, { useEffect, useState, useRef } from "react";

import ProfileHeader from "./ProfileHeader";
import { Outlet } from "react-router-dom";
import Boxes from "./Boxes";
import toggleInputs from "../utilities/toggleInputs";
import NoteService from "../services/note.service";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Box, Grid, Stack, Toolbar, Input, TextField, Typography } from "@mui/material";

import SideNavbar from "./SideNavbar";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const Profile = () => {
  const { isEditing, setIsEditing, toggleEditMode } = toggleInputs();

  const {
    notes,
    noteInput,
    setNoteInput,
    notesId,
    changeNoteInput,
    getNotes,
    handleAddNote,
    handleNoteSave,
  } = NoteService();

  const currentUser = AuthService.getCurrentUser();

  // Find the note with the specified notesId

  const currentNote = notes.find((note) => note.id === notesId);
  



  const inputRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    if (currentNote) {
      if (isEditing) {
        currentNote.noteInput = noteInput;
      }
      console.log("currentNoteInput:" + currentNote.noteInput);
    }
  }, [currentNote, toggleEditMode, setNoteInput]);

  useEffect(() => {
    const toggledNote = notes.find((note) => note.id === notesId);
    if (toggledNote) {
      currentNote.noteInput = toggledNote.noteInput;
    }
    if (toggledNote === undefined) {
      
      navigate(`/profile/${currentUser.id}`);
    } else {
      currentNote.noteInput = null;
    }
    console.log("noteId:", notesId);
  }, [notesId]);

  console.log(currentNote.id)

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <SideNavbar />
        
        <Stack sx={{ flexGrow: 1, p: 3, bgcolor: "" }}>
          <Toolbar />
          
          
            {currentNote.id ? (
              <Box sx={{ bgcolor: "" }}>
              <Box key={currentNote.id} onClick={toggleEditMode}>
                {isEditing ? (
                  
                  <input
                    ref={inputRef}
                    type="text"
                    onChange={changeNoteInput}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        toggleEditMode();
                        setTimeout(() => {
                          handleNoteSave();
                        }, 0);
                      }
                    }}
                    style={{
                      width: '300px',       // Adjust width as needed
                      height: '40px',       // Adjust height as needed
                      fontSize: '16px',     // Adjust font size as needed
                      padding: '10px',      // Adjust padding for a larger input area
                      border: 'none',
                      outline:'none'
                    }}
                    // readOnly={isEditing ? false : true} // Check this line
                  />
                ) : (
                  <Typography variant="h6">{currentNote.noteInput}</Typography>
                )}
              </Box>
              </Box>
            ):<Input disabled defaultValue="Disabled" />} 
          
           {currentNote.id ? (
            <Box sx={{ bgcolor: "" }}>
              <Boxes />
            </Box>
          ): <Toolbar sx={{ bgcolor: "" }}/>}
        </Stack>
      </Box>
      <Outlet />
    </>
  );
};

export default Profile;
