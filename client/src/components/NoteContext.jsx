import React, { createContext, useContext, useState } from "react";

const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const savedNoteId = localStorage.getItem("noteId");
  const savedNotes = localStorage.getItem("notes");
  const savedBoxId = localStorage.getItem('boxes')
  const [notes, setNotes] = useState(savedNotes ? JSON.parse(savedNotes) : []);
  const [noteInput, setNoteInput] = useState("");

  const [noteId, setNoteId] = useState(savedNoteId ? parseInt(savedNoteId) : 1);
  const [boxId, setBoxId] = useState(savedBoxId ? parseInt(savedBoxId) : 1)
  return (
    <NoteContext.Provider
      value={{ notes, setNotes, noteInput, setNoteInput, noteId, setNoteId, boxId, setBoxId }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export const useNote = () => {
  return useContext(NoteContext);
};
