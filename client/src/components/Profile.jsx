import React, { useEffect, useState, useRef } from "react";

import ProfileHeader from "./ProfileHeader";
import { Outlet } from "react-router-dom";
import Boxes from "./Boxes";
import toggleInputs from "../utilities/toggleInputs";
import NoteService from "../services/note.service";
import { Link } from "react-router-dom";

const Profile = () => {
  const { isEditing, setIsEditing, toggleEditMode } = toggleInputs();

  const {
    notes,
    noteInput,
    setNoteInput,
    noteId,
    changeNoteInput,
    handleAddNote,
    handleNoteSave,
  } = NoteService();

  // Find the note with the specified notesId
  const currentNote = notes.find((note) => note.id === noteId);
  
  console.log("currentNote:", currentNote)
  console.log("notes:", notes)
  console.log('noteInput:', noteInput)


  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    if (currentNote) {
      if (isEditing) {
        currentNote.noteInput = noteInput
      }
      console.log('currentNoteInput:' + currentNote.noteInput)
    }
  }, [currentNote, toggleEditMode, setNoteInput]);

  return (
    <>
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
      <Outlet />
    </>
  );
};

export default Profile;
