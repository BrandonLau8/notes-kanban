import React, { createContext, useContext, useState } from "react";

const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const savedNoteId = localStorage.getItem("noteId");
  const savedNotes = localStorage.getItem("notes");
  const [notes, setNotes] = useState(savedNotes ? JSON.parse(savedNotes) : []);
  const [noteInput, setNoteInput] = useState("");

  const [noteId, setNoteId] = useState(savedNoteId ? parseInt(savedNoteId) : null);
  return (
    <NoteContext.Provider
      value={{ notes, setNotes, noteInput, setNoteInput, noteId, setNoteId }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export const useNote = () => {
  return useContext(NoteContext);
};
