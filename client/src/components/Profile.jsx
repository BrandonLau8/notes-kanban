import React, { useEffect, useState, useRef } from "react";

import ProfileHeader from "./ProfileHeader";
import { Outlet } from "react-router-dom";
import Boxes from "./Boxes";
import toggleInputs from "../utilities/toggleInputs";
import NoteService from "../services/note.service";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import SideNavbar from "./SideNavbar";

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

  // Find the note with the specified notesId
  const currentNote = notes.find((note) => note.id === notesId);

  const inputRef = useRef(null);
  const location = useLocation();

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
    } else {
      currentNote.noteInput = null;
    }
    console.log("noteId:", notesId);
  }, [notesId]);

  const drawerWidth = 500;

  return (
    <>
    <Grid container spacing={2}>
      <Grid item md={5}>
    <SideNavbar/>
    </Grid>
    <Grid item md={7}>
      <Box
        component="main"
        sx={{
          flexGrow:1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <ProfileHeader />
        <div>
          {currentNote && (
            <div key={currentNote.id} onClick={toggleEditMode}>
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
                  readOnly={isEditing ? false : true} // Check this line
                />
              ) : (
                <strong>{currentNote.noteInput}</strong>
              )}
            </div>
          )}
        </div>
        <Boxes />
      </Box>
      </Grid>
      </Grid>
      <Outlet />
    </>
  );
};

export default Profile;
