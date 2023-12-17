import React, { useState, useEffect } from "react";
import axios from "axios";
import AuthService from "../services/auth.service";
import useAutosave from "./useAutosave";
import Notes from "./Notes";

const Crud = () => {
  const currentUser = AuthService.getCurrentUser();
  const storedData = localStorage.getItem("data");
  const [box, setBox] = useState(JSON.parse(storedData) || []);
  const [input, setInput] = useState("");
  const [content, setContent] = useState("");

  const {noteInput} = Notes();

  const getBox = () => {
    axios
      .get(`http://localhost:3001/profile/${currentUser.id}/${noteInput}`, {})
      .then((response) => {
        console.log(response.data.content);
        setBox([...response.data.content]);
      });
  };

  const handleAddBox = (e) => {
    e.preventDefault();

    let hash = 0;

    if (input) {
      for (let i = 0; i < input.length; i++) {
        const char = input.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash | 0;
      }
      const hashString = hash.toString();
      console.log(hash);
      const newBox = { id: hashString, input: input, content: "" };

      axios
        .post(`http://localhost:3001/profile/${currentUser.id}/${noteInput}`, {
          input: input,
          id: hashString,
        })
        .then(() => {
          setBox((prevBox) => [...prevBox, newBox]);
          setInput("");
        });

      return {
        input: input,
        content: "",
        id: hashString,
      };
    }
  };

  const handleDeleteBox = (item) => {
    const updatedBox = box.filter((val) => val.input !== item.input);

    axios
      .delete(`http://localhost:3001/profile/${currentUser.id}/${noteInput}`, {
        data: { input: item.input },
      })
      .then(() => {
        console.log(item.input);
        setBox(updatedBox);
      });
  };

  const handleSave = async () => {
    const updatedBoxes = box.map((item) => {
      let hash = 0;
      const input = item.input;

      for (let i = 0; i < input.length; i++) {
        const char = input.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash | 0;
      }
      const hashString = hash.toString();
      console.log(hash);
      return {
        input: item.input,
        content: item.content,
        id: hashString,
      };
    });
    await axios.patch(
      `http://localhost:3001/profile/${currentUser.id}/${noteInput}`,
      updatedBoxes
    );
    console.log(updatedBoxes);
  };

  const changeInput = (e) => {
    setInput(e.target.value);
  };



  useEffect(() => {
    getBox();
    localStorage.setItem("data", JSON.stringify(box));

    // Cleanup function
    return () => {
      localStorage.removeItem("data");
    };
  }, [currentUser.id]);

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
