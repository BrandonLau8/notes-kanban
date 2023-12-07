import React, { useState, useEffect } from "react";
import axios from "axios";
import AuthService from "../services/auth.service";
import useAutosave from "./useAutosave";

// const API_URL = "http://localhost:3001/profile/";

const Notes = () => {
  const currentUser = AuthService.getCurrentUser();
  const storedData = localStorage.getItem("data");
  const [box, setBox] = useState(JSON.parse(storedData) || []);
  const [input, setInput] = useState("");
  const [content, setContent] = useState("");

  // const updatedBox = (item) => {
  //   axios
  //     .put(`http://localhost:3001/profile/${currentUser.id}`, {
  //       content: item.content,
  //     }).then(

  //     )
  // };

  const getBox = () => {
    axios
      .get(`http://localhost:3001/profile/${currentUser.id}`, {})
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
        data: { input: item.input },
      })
      .then(() => {
        console.log(item.input);
        setBox(updatedBox);
      });
  };

  const handleSave = async () => {
    const updatedBoxes = box.map((item) => ({
      input: item.input,
      content: item.content,
      id: item.key +1
    }));

    // const requestBody = { content: updatedBoxes.content, id: updatedBoxes.id };
    // const updatedBoxesObject = box.reduce((acc, item) => {
    //   acc[item.key] = {
    //     input: item.input,
    //     content: item.content,
    //     key: item.key,
    //   };
    //   return acc;
    // }, {});
    await axios.patch(
      `http://localhost:3001/profile/${currentUser.id}`, 
        updatedBoxes
      
      
      
  );
  console.log(updatedBoxes)
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
                    (boxItem) => boxItem.key === item.key
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
        ))}
      </div>
    </>
  );
};

export default Notes;
