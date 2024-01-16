import React, { useState, useEffect } from "react";
import Crud from "../services/crud.service";
import NoteService from "../services/note.service";

const BoxInput = () => {
    const {
        getBox,
        handleAddBox,
        handleDeleteBox,
        handleSave,
        changeInput,
        boxId,
        box,
        setBox,
        input,
        setInput,
      } = Crud();

  return (
    <>
    <div>
      <button onClick={handleAddBox}>Add TextArea</button>
      <input
        type="text"
        value={input}
        placeholder="what you want"
        onChange={changeInput}
      />
    </div>
    </>
  )
}

export default BoxInput