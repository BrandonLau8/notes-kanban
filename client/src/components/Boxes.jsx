import React, { useState, useEffect } from "react";
import Crud from "../services/crud.service";
import NoteService from "../services/note.service";
import BoxInput from "./BoxInput";

const Boxes = () => {
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

  const {
    notes,
    noteInput,
    notesId,
    setNoteInput,
    changeNoteInput,
    handleAddNote,
  } = NoteService();

  return (
    <>
      <>
        <div>
          <button onClick={handleAddBox}>Add TextArea</button>
          <button onClick={getBox}>Get Box</button>
          <input
            type="text"
            value={input}
            placeholder="what you want"
            onChange={changeInput}
          />
        </div>
      </>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
        {box.map((item) => (
          <div
            id={item.id}
            style={{ display: "grid", gridTemplateRows: "1fr" }}
          >
            <div>
              <label>{item.input}</label>
              <button onClick={() => handleDeleteBox(item)}>
                Delete TextArea
              </button>
            </div>

            <textarea
              rows="10"
              style={{ resize: "none" }}
              value={item.content}
              onChange={(e) => {
                const newValue = e.target.value;
                setBox((prevBox) => {
                  const updatedBox = [...prevBox];
                  const index = updatedBox.findIndex(
                    (boxItem) => boxItem.id === item.id
                  );
                  if (index !== -1) {
                    updatedBox[index].content = newValue;
                  }

                  return updatedBox;
                });
              }}
              onBlur={() => {
                // Add a delay to wait for the state update to complete
                setTimeout(() => {
                  handleSave();
                }, 0);
              }}
            />
          </div>
        ))
     
      }
      </div>

      {/* ) : null} */}
    </>
  );
};

export default Boxes;
