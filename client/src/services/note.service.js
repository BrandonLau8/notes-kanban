import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthService from "./auth.service";
import useAutosave from "../components/useAutosave";
import Crud from "../components/Crud";
import { useNote } from "../components/NoteContext";

const NoteService = () => {
  const { notes, setNotes } = useNote();
  const { noteInput, setNoteInput } = useNote();
  const { noteId, setNoteId } = useNote();

  const currentUser = AuthService.getCurrentUser();

  const API_URL = `http://localhost:3001/profile/${currentUser.id}`;
  const navigate = useNavigate();

  const getNotes = async () => {
    const allNotes = notes.map((item) => ({
      id: item.id,
      noteInput: item.noteInput,
    }));
    
   await Promise.all(
      allNotes.map((item) =>
        axios.get(
          `http://localhost:3001/profile/${currentUser.id}/${item.id}`
        )
      )
    ).then((response) => {
      console.log("getNotes:", response);
      setNotes(response);
    });
  };

  const handleAddNote = () => {
    const defaultNoteInput = "New Note";
    axios
      .post(API_URL, {
        noteInput,
      })
      .then((res) => {
        const newNote = {
          id: res.data.id,
          noteInput: defaultNoteInput,
        };
        setNoteId(res.data.id);
        setNotes((prevNote) => [...prevNote, newNote]);

        navigate(`/profile/${currentUser.id}/${newNote.id}`);

        console.log("Value of noteId:", noteId);
      })
      .catch((error) => {
        console.error("Error adding note:", error);
      });
  };

  const changeNoteInput = (e) => {
    setNoteInput(e.target.value);
  };

  const handleNoteSave = async () => {
    const updatedNotes = notes.map((item) => ({
      id: item.id,
      noteInput: item.noteInput,
    }));

    await Promise.all(
      updatedNotes.map((updatedNote) =>
        axios.patch(
          `http://localhost:3001/profile/${currentUser.id}/${updatedNote.id}`,
          updatedNote
        )
      )
    ).then(
      setNotes((prevNotes) =>
        prevNotes.map(
          (prevNote) =>
            updatedNotes.find(
              (updatedNote) => updatedNote.id === prevNote.id
            ) || prevNote
        )
      )
    );
  };

  const handleDeleteNote = () => {};

  useAutosave(() => {
    handleNoteSave();
  }, 60 * 1000);

  return {
    notes,
    setNotes,
    noteInput,
    setNoteInput,
    noteId,
    setNoteId,
    getNotes,
    handleAddNote,
    handleNoteSave,
    changeNoteInput,
  };
};

export default NoteService;
