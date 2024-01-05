import React from "react";

import ProfileHeader from "./ProfileHeader";
import { Outlet } from "react-router-dom";
import Boxes from "./Boxes";
import toggleInputs from "../utilities/toggleInputs";
import NoteService from "../services/note.service";

const Profile = () => {
  const { isEditing, setIsEditing, toggleEditMode } = toggleInputs();

  const {
    notes,
    noteInput,
    setNoteInput,
    changeNoteInput,
    handleAddNote,
    handleNoteSave,
  } = NoteService();

  

  const updatedNotes = notes.map((item) => {
    return {
      id: item.id,
      noteInput: item.noteInput,
    };
  });
  return (
    <>
      <ProfileHeader />
      <div>
        {isEditing ? (
          <input
            type="text"
            value={noteInput}
            placeholder="Profile Header"
            onChange={changeNoteInput}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                toggleEditMode();
                setTimeout(() => {
                  handleNoteSave();
                }, 0);
              }
            }}
          />
        ) : (
          <div onClick={toggleEditMode}>
            <strong>{noteInput ? noteInput : "New Note"}</strong>
          </div>
        )}
      </div>

      <Boxes />
      <Outlet />
    </>
  );
};

export default Profile;
