import React, { useState, useEffect } from "react";
import axios from "axios";
import AuthService from "./auth.service";
import useAutosave from "../components/useAutosave";
import Notes from "./note.service";
import { useNote } from "../components/NoteContext";

const CrudService = () => {
  const { notesId, setNotesId } = useNote();
  const { boxId, setBoxId } = useNote();
  const { box, setBox } = useNote();

  const currentUser = AuthService.getCurrentUser();

  const [input, setInput] = useState("");
  const [content, setContent] = useState("");

  // const currentBoxes = box.find((item) => item.id === boxId);
  // console.log(currentBoxes.id)

  useEffect(() => {
    // const toggledBoxes = box.map((item) => item.id === notesId)

    getBox();
  }, [notesId]);

  const getBox = () => {
    // const selectedBoxes = box.find((item) => item.notesId === notesId);
    console.log(notesId);

    Promise.all([
      axios.get(`http://localhost:3001/profile/${currentUser.id}/${notesId}`),
    ]).then((response) => {
      response.map((item) => setBox((prevBoxes) => [prevBoxes, ...item.data]));

      console.log("getBox", box);
    });
  };

  const handleAddBox = (e) => {
    const defaultContent = "";
   
    axios
      .post(`http://localhost:3001/profile/${currentUser.id}/${notesId}`, {
        input: input,
        content: defaultContent,
      })
      .then((res) => {
        console.log(res);
        const newBox = {
          input: input,
          content: "",
          id: res.data.id,
          notesId: res.data.notesId,
        };
        setBox((prevBox) => [...prevBox, newBox]);
        setBoxId(res.data.id);
        setInput("");
        console.log("boxid:", res.data.id);
    
      });
  };

  const handleDeleteBox = (item) => {
    const updatedBox = box.filter((val) => val.id !== item.id);
    console.log(item.id);

    axios
      .delete(`http://localhost:3001/profile/${currentUser.id}`, {
        data: { id: item.id },
      })
      .then(() => {
        console.log(item.input);
        setBox(updatedBox);
      });
  };

  const handleSave = async () => {
    const updatedBoxes = box.map((item) => {
      return {
        content: item.content,
        id: item.id,
      };
    });
    await axios.patch(
      `http://localhost:3001/profile/${currentUser.id}`,
      updatedBoxes
    );
    console.log("Saved Boxes:" + updatedBoxes);
  };

  const changeInput = (e) => {
    setInput(e.target.value);
  };

  useAutosave(() => {
    handleSave();
  }, 60 * 1000);

  return {
    currentUser,
    getBox,
    handleAddBox,
    handleDeleteBox,
    handleSave,
    changeInput,
    box,
    setBox,
    input,
    setInput,
    content,
    setContent,
  };
};

export default CrudService;
