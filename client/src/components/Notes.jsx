import React, { useState, useEffect } from "react";
import axios from "axios";
import AuthService from "../services/auth.service";

// const API_URL = "http://localhost:3001/profile/";

const Notes = () => {
  const currentUser = AuthService.getCurrentUser();
  const storedData = localStorage.getItem("data");
  const [box, setBox] = useState(JSON.parse(storedData) || []);
  const [input, setInput] = useState("");

  const saveBox = (item) => {
    axios
      .put(`http://localhost:3001/profile/${currentUser.id}`, {
        content: item.content,
        input: item.input,
      })
      .then((response) => {
        alert("update");
      });
  };

  const getBox = () => {
    axios
      .get(`http://localhost:3001/profile/${currentUser.id}`, {
      })
      .then((response) => {
        console.log(response.data.content);
        setBox([...response.data.content]);
      });
  };

  const handleAddBox = (e) => {
    e.preventDefault();
    if (input) {
      const newBox = { input: input, key: box.length, content: "" };

      axios
        .post(`http://localhost:3001/profile/${currentUser.id}`, {
          input: input,
        })
        .then(() => {
          setBox((prevBox) => [...prevBox, newBox]);
          setInput("");
        });
    }
  };

  const handleDeleteBox = (item) => {
    const updatedBox = box.filter((val) => val.input !== item.input);
    axios
      .delete(`http://localhost:3001/profile/${currentUser.id}`, {
        data: {input: item.input},
      })
      .then(() => {
        console.log(item.input)
        setBox(updatedBox);
      });
  };

  const handleBoxChange = (index, value) => {
    const updatedBoxes = [...box];
    updatedBoxes[index].content = value;
    setBox(updatedBoxes);
  };

  const changeInput = (e) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    getBox();
    localStorage.setItem("data", JSON.stringify(box));
  }, [currentUser.id]);
  return (
    <>
      <button onClick={handleAddBox}>Add TextArea</button>
      <button onClick={getBox}>Show Text Areas</button>

      <input
        type="text"
        value={input}
        placeholder="what you want"
        onChange={changeInput}
      />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
        {box.map((item) => (
          <div
            key={item.key}
            style={{ display: "grid", gridTemplateRows: "1fr" }}
          >
            <div>
              <label>{item.input}</label>
              <button onClick={() => handleDeleteBox(item)}>
                Delete TextArea
              </button>
              <button onClick={() => saveBox(item, item.input)}>
                Save TextArea
              </button>
            </div>

            <textarea
              rows="10"
              style={{ resize: "none" }}
              value={item.content}
              onChange={(e) => handleBoxChange(item.key, e.target.value)}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Notes;
