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
        input: item.input,
      })
      .then((response) => {
        alert("update");
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
    {
      input
        ? axios
            .post("http://localhost:3001/create", {
              input: input,
            })
            .then(() => {
              setBox((prevBox) => [...prevBox, newBox]);
              setInput("");
            })
        : null;
    }
  };

  const handleDeleteBox = (item) => {
    const boxes = [...box];
    axios
      .delete(`http://localhost:3001/delete/${item.input}`, {
        data: { input: item.input},
      })
      .then(() => {
        setBox(
          boxes.filter((val) => {
            return val.input != item.input;
          })
        );
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

export default App;
