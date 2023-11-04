import React, { useState, useEffect } from "react";
import axios from "axios";
import Notes from "./components/Notes";

const App = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const response = await axios.post("http://localhost:3001/createuser", {
        username: user,
        password: password,
      });
      if (response.status === 201) {
        alert("User Added");
      } else {
        console.error("Unexpected status:", response.status);
        alert("Failed to add user. Check console for details.");
      }
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Failed to add user");
    }
  };

  const changeUserInput = (e) => {
    setUser(e.target.value);
  };

  const changePasswordInput = (e) => {
    setPassword(e.target.value);
  };

  const submitForm = (e) => {
    e.preventDefault();
    login(user, password);
  };

  return (
    <>
      <div
        style={{
          display: "grid",
          backgroundColor: "",
          justifyContent: "center",
        }}
      >
        <form>
          <label>username</label>
          <input
            type="text"
            value={user}
            placeholder="Username"
            onChange={changeUserInput}
          />
        </form>
        <form>
          <label>password</label>
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={changePasswordInput}
          />
        </form>
        <section>
          <button onClick={submitForm}>Login</button>
        </section>
      </div>
      {/* <Notes /> */}
    </>
  );
};

export default App;
