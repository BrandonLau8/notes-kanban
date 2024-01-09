import React, { useEffect, useState, useRef } from "react";

import toggleInputs from "../utilities/toggleInputs";
import NoteService from "../services/note.service";
import { Link } from "react-router-dom";
import { useLocation} from "react-router-dom";


const CurrentNote = () => {
  const { isEditing, setIsEditing, toggleEditMode } = toggleInputs();

  const {
    notes,
    noteInput,
    setNoteInput,
    noteId,
    changeNoteInput,
    getNotes,
    handleAddNote,
    handleNoteSave,
  } = NoteService();

  // Find the note with the specified notesId
  const currentNote = notes.find((note) => note.id === noteId);

  // console.log("currentNote:", currentNote)
  // console.log("notes:", notes)
  // console.log('noteInput:', noteInput)

  return (
    <>
      <div>
        {currentNote && (
          <div key={currentNote.id} onClick={toggleEditMode}>
            {isEditing ? (
              <input
                ref={inputRef}
                type="text"
                onChange={changeNoteInput}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    toggleEditMode();

                    setTimeout(() => {
                      handleNoteSave();
                    }, 0);
                  }
                }}
                readOnly={isEditing ? false : true} // Check this line
              />
            ) : (
              <strong>{currentNote.noteInput}</strong>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default CurrentNote;
