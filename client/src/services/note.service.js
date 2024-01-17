import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthService from "./auth.service";
import useAutosave from "../components/useAutosave";
import CrudService from "./crud.service";
import { useNote } from "../components/NoteContext";

const NoteService = () => {
  const { notes, setNotes } = useNote();
  const { noteInput, setNoteInput } = useNote();
  const { notesId, setNotesId } = useNote();
  const {box, setBox} = useNote();

  const currentUser = AuthService.getCurrentUser();

  const API_URL = `http://localhost:3001/profile/${currentUser.id}`;
  const navigate = useNavigate();

  const {getBox} = CrudService()

  useEffect(() => {
    getNotes();
    localStorage.setItem("notes", JSON.stringify(notes));
    localStorage.setItem("notesId", JSON.stringify(notesId));

    if (notesId === undefined) {
      navigate(`/profile/${currentUser.id}`);
    }
    console.log('hello')
    getBox()
  
  }, [notesId]);

  const getNotes = () => {
    const allNotes = notes.map((item) => ({
      id: item.id,
      noteInput: item.noteInput,
    }));
    Promise.all(
      allNotes.map((item) =>
        axios.get(
          `http://localhost:3001/profile/${currentUser.id}`,
          { params: item }
        )
      )
    ).then((response) => {
      response.map((item) => setNotes((prevNote) => [prevNote, ...item.data]));
      console.log(response)
    });
    
    console.log(notes);
  };

  const handleAddNote = () => {
    const defaultNoteInput = "New Note";
    axios
      .post(API_URL, {
        defaultNoteInput,
      })
      .then((res) => {
        const newNote = {
          id: res.data.id,
          noteInput: defaultNoteInput,
        };
        setNotesId(res.data.id);
        setNotes((prevNote) => [...prevNote, newNote]);

        navigate(`/profile/${currentUser.id}/${newNote.id}`);

        console.log("Value of noteId:", notesId);
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

  const handleDeleteNote = (item) => {
    const updatedNote = notes.filter((val) => val.id !== item);

    axios
      .delete(`http://localhost:3001/profile/${currentUser.id}/${item}`, {
        data: { id: item },
      })
      .then(() => {
        setNotes(updatedNote);

        console.log(updatedNote);
        console.log(item);
      })
      .then(() => {
        if (item === notesId) {
          const redirectNote = updatedNote[updatedNote.length - 1];
          setNotesId(redirectNote.id);
          console.log(redirectNote);
          navigate(`/profile/${currentUser.id}/${redirectNote.id}`);
        }
      });
  };

  useAutosave(() => {
    handleNoteSave();
  }, 60 * 1000);

  return {
    notes,
    setNotes,
    noteInput,
    setNoteInput,
    notesId,
    setNotesId,
    getNotes,
    handleAddNote,
    handleNoteSave,
    handleDeleteNote,
    changeNoteInput,
  };
};

export default NoteService;
