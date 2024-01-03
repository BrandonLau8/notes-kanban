import React, { useEffect, useState } from "react";
import AuthService from "../services/auth.service";
import NoteService from "../services/note.service";
import { Outlet } from "react-router-dom";

const ProfileHeader = () => {
  const currentUser = AuthService.getCurrentUser();

  const { notes, noteInput, setNoteInput, changeNoteInput, handleAddNote, handleNoteSave } =
    NoteService();

  const [isEditing, setIsEditing] = useState(true);

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const updatedNotes = notes.map((item) => {
    return {
      id: item.id,
      noteInput: item.noteInput
    }
  });
 

  return (
    <div className="ml-3">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <strong>Authorities:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>
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
            <strong>{noteInput ? noteInput : 'New Note'}</strong>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
