import React, { useState, useEffect } from "react";
import axios from "axios";
import AuthService from "../services/auth.service";
import useAutosave from "./useAutosave";
import Notes from "../services/note.service";
import { useNote } from "./NoteContext";

const Crud = () => {
  const currentUser = AuthService.getCurrentUser();
  const storedData = localStorage.getItem("data");
  const [box, setBox] = useState(JSON.parse(storedData) || []);
  const [input, setInput] = useState("");
  const [content, setContent] = useState("");

  // const currentBoxes = box.find((item) => item.id === boxId);
  // console.log(currentBoxes.id)
  const { noteId, setNoteId } = useNote();
  const {boxId, setBoxId} = useNote()
  

  const getBox = () => {
    axios
      .get(`http://localhost:3001/profile/${currentUser.id}`, {})
      .then((response) => {
        console.log(response.data.content);
        setBox([...response.data.content]);
      });
  };

  const handleAddBox = (e) => {
    const defaultContent = 'New Content'
    axios
      .post(`http://localhost:3001/profile/${currentUser.id}/${noteId}`, {
        input: input,
        content: defaultContent,
      })
      .then((res) => {
        console.log(res);
        const newBox = { input: input, content: "", id: res.data.id };
        setBox((prevBox) => [...prevBox, newBox]);
        setInput("");
      });

    return {
      input: input,
      content: "",
    };
  };

  const handleDeleteBox = (item) => {
    const updatedBox = box.filter((val) => val.id !== item.id);

    axios
      .delete(`http://localhost:3001/profile/${currentUser.id}`, {
        data: { input: item.input },
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
    console.log('Saved Boxes:' + updatedBoxes);
  };

  const changeInput = (e) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    getBox();
    localStorage.setItem("boxes", JSON.stringify(box));

    // //Cleanup function
    // return () => {
    //   localStorage.removeItem("data");
    // };
  }, [noteId]);

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

export default Crud;
