import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthService from "./auth.service";
import useAutosave from "../components/useAutosave";
import Crud from "../components/Crud";
import { useNote } from "../components/NoteContext";

const NoteService = () => {
  const { notes, setNotes } = useNote();
  const [noteInput, setNoteInput] = useState("");
  const currentUser = AuthService.getCurrentUser();
  const API_URL = `http://localhost:3001/profile/${currentUser.id}`;

  const getNotes = () => {};

  const handleAddNote = () => {
    axios
      .post(API_URL, {
        noteInput,
      })
      .then((res) => {
        // console.log("createNotedata:", res.data.id);
        const newNote = {id: res.data.id, noteInput: noteInput };
        setNotes((prevNote) => [...prevNote, newNote]);
        console.log(notes)
      })
      .catch((error) => {
        console.error("Error adding note:", error);
      });
  };

  const changeNoteInput = (e) => {
    setNoteInput(e.target.value);
  };

  return {
    notes,
    setNotes,
    noteInput,
    setNoteInput,
    handleAddNote,
    changeNoteInput,
  };
};

export default NoteService;
