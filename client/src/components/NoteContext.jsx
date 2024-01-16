import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const navigate = useNavigate();
  const currentUser = AuthService.getCurrentUser();

  const savedNoteId = localStorage.getItem("notesId");
  const savedNotes = localStorage.getItem("notes");
  const savedBoxId = localStorage.getItem("boxId");
  const savedBoxes = localStorage.getItem(`boxes`);

  const [notes, setNotes] = useState(savedNotes ? JSON.parse(savedNotes) : []);
  const [noteInput, setNoteInput] = useState("");
  const [notesId, setNotesId] = useState(
    savedNoteId ? parseInt(savedNoteId) : null
  );



  const [box, setBox] = useState(savedBoxes ? JSON.parse(savedBoxes) : []);
  const [boxId, setBoxId] = useState(savedBoxId ? parseInt(savedBoxId) : 1);
  return (
    <NoteContext.Provider
      value={{
        notes,
        setNotes,
        noteInput,
        setNoteInput,
        notesId,
        setNotesId,
        boxId,
        setBoxId,
        box,
        setBox,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export const useNote = () => {
  return useContext(NoteContext);
};
