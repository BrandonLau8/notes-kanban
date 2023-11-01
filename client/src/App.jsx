import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const storedData = localStorage.getItem("data");
  const [box, setBox] = useState(JSON.parse(storedData) || []);
  const [input, setInput] = useState("");

  const saveBox = (item) => {
    axios
      .put("http://localhost:3001/update", {
        content: item.content,
        id: item.id
      })
      .then(() => {
        setBox(box.map((val) => {
          return val.id == id 
          ? {
            id: val.id,
            content: val.content
          }
          : val;
        }))
      });
  };

  const getBox = () => {
    axios.get("http://localhost:3001/boxes").then((response) => {
      setBox(response.data);
    });
  };

  const handleAddBox = (e) => {
    e.preventDefault();
    const newBox = { input: input, key: box.length, content: "" };
    axios
      .post("http://localhost:3001/create", {
        input: input
      })
      .then(() => {
        setBox((prevBox) => [...prevBox, newBox]);
        setInput("");
      });
  };

  const handleDeleteBox = (index) => {
    const boxes = [...box];
    boxes.splice(index, 1);
    setBox(boxes);
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
    localStorage.setItem("data", JSON.stringify(box));
  }, [box]);

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
              <button onClick={handleDeleteBox}>Delete TextArea</button>
              <button onClick={() => saveBox(item)}>Save TextArea</button>
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

export default App;
