import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthService from "./auth.service";
import useAutosave from "../components/useAutosave";
import Crud from "../components/Crud";
import { useNote } from "../components/NoteContext";

const NoteService = () => {
  const { notes, setNotes } = useNote();
  const {noteInput, setNoteInput} = useNote();
  const currentUser = AuthService.getCurrentUser();
  const API_URL = `http://localhost:3001/profile/${currentUser.id}`;
  const navigate = useNavigate();

  const getNotes = () => {};

  const handleAddNote = () => {
    axios
      .post(API_URL, {
        noteInput,
      })
      .then((res) => {
        // console.log("createNotedata:", res.data.id);
        const newNote = {
          id: res.data.id, 
          noteInput: 
            noteInput !== '' ? noteInput : 'New Note' };
        setNotes((prevNote) => [...prevNote, newNote]);
        setNoteInput('')
        navigate(`/profile/${currentUser.id}/${newNote.id}`)
        console.log(newNote.noteInput)
      })  
      .catch((error) => {
        console.error("Error adding note:", error);
      });
  };

  const changeNoteInput = (e) => {
    setNoteInput(e.target.value);
  };

  const handleNoteSave = async () => {
    const updatedNotes = notes.map((item) => {
      return {
        id: item.id,
        noteInput: item.noteInput
      }
    });
    const notesIdToUpdate = updatedNotes[0].id;

    await axios.patch(
      `http://localhost:3001/profile/${currentUser.id}/${notesIdToUpdate}`,
      updatedNotes
    );
    console.log('NotesId:' + notesIdToUpdate);
    console.log('UpdatedNotes:' + updatedNotes)
  }


  const handleDeleteNote = () => {
 
  }

  useAutosave(() => {
    handleNoteSave();
  }, 60*1000)

  return {
    notes,
    setNotes,
    noteInput,
    setNoteInput,
    handleAddNote,
    handleNoteSave,
    changeNoteInput,
  };
};

export default NoteService;
