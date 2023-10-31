import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const storedData = localStorage.getItem("data");
  const [box, setBox] = useState(JSON.parse(storedData) || []);
  const [input, setInput] = useState("");
  const [content, setContent] = useState('');

  const saveBox = (item) => {
    axios.post("http://localhost:3001/create", {
      input: item.input,
      content: item.content,
    }).then(() => {
      console.log('success');
    })
  };

  const handleAddBox = (e) => {
    e.preventDefault();
    console.log("Form submitted with value:", input);
    if (box.length < 6 && input) {
      const newBox = { input: input, key: box.length, content: "" };
      setBox((prevBox) => [...prevBox, newBox]);
      console.log(newBox);
      setInput("");
    }
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
