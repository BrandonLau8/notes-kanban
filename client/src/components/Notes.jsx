import React, { useState, useEffect } from "react";
import axios from "axios";
import AuthService from "../services/auth.service";
import useAutosave from "./useAutosave";
import Crud from "./Crud";

const Notes = () => {
    const [note, setNote] = useState([]);
    const [noteInput, setNoteInput] = useState("");

    const {currentUser} = Crud;

    const getNotes = () => {
       
    }

    const handleAddNote = (e) => {
        
        const newNote = { noteInput: noteInput };
        // axios
        //   .post(`http://localhost:3001/profile/${currentUser.id}/${noteInput}`, {
        //     noteInput: noteInput,
           
        //   })
        //   .then(() => {
        //     setNote((prevNote) => [...prevNote, newNote]);
        //     setNoteInput("");
        //   });
        setNote((prevNote) => [...prevNote, newNote]);
        setNoteInput("");
        
      };

      const changeNoteInput = (e) => {
        setNoteInput(e.target.value);
      };

  return {
    note,
    setNote,
    noteInput,
    setNoteInput,
    handleAddNote,
    changeNoteInput,
  }
}

export default Notes