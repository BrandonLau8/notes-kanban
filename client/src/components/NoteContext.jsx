import React, {createContext, useContext, useState} from 'react'

const NoteContext = createContext();

export const NoteProvider = ({children}) => {
    const [notes, setNotes] = useState([]);
    const [noteInput, setNoteInput] = useState('');
    const [noteId, setNoteId] = useState(null)
  return (
    <NoteContext.Provider value={{notes, setNotes, noteInput, setNoteInput, noteId, setNoteId}}>
        {children}
    </NoteContext.Provider>
  )
}

export const useNote = () => {
    return useContext(NoteContext);
}

