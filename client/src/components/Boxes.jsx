import React, { useState, useEffect } from "react";
import Crud from "../services/crud.service";
import NoteService from "../services/note.service";
import BoxInput from "./BoxInput";
import { Box, Button, TextareaAutosize, TextField, Typography } from "@mui/material";

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
        <Box display={'flex'} gap={2}>
          <Button variant="contained" onClick={input !== '' ? handleAddBox: null}>Add TextArea</Button>

          <TextField
            type="text"
            variant="outlined"
            value={input}
            placeholder="what you want"
            onChange={changeInput}
          />
        </Box>
      </>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
        {box ? 
        box
        .filter((item) => item.id > 0)
        .map((item) => (
          <div
            id={item.id}
            style={{ display: "grid", gridTemplateRows: "1fr" }}
          >
            <div>
              <Typography paddingTop={2} variant="h5">{item.input}</Typography>
              <Button variant="contained" color="error" onClick={() => handleDeleteBox(item)}>
                Delete TextArea
              </Button>
            </div>

            <TextareaAutosize
              // rows="10"
              minRows={10}
      
              style={{ resize: "none", marginTop:"20px", marginRight:"20px", fontSize: "18px"}}
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
      : null}
      </div>
    </>
  );
};

export default Boxes;
