import React, {createContext, useContext, useState} from 'react'

const NoteContext = createContext();

export const NoteProvider = ({children}) => {
    const [notes, setNotes] = useState([]);
  return (
    <NoteContext.Provider value={{notes, setNotes}}>
        {children}
    </NoteContext.Provider>
  )
}

export const useNote = () => {
    return useContext(NoteContext);
}

