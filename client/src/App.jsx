import React, { useState, useEffect } from "react";
import axios from "axios";
import Notes from "./components/Notes";
import { Outlet, Link, useNavigate } from "react-router-dom";

const App = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //Register
  const register = async () => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3001/register", {
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
    } finally {
      setLoading(false);
    }
  };

  //Login
  const login = async () => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3001/login", {
        username: user,
        password: password,
      });

      if (response.status === 200) {
       const accessToken = response.headers['set-cookie']

       if(accessToken) {
          await axios.get("http://localhost:3001/profile", {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
            
          });
          setIsAuthenticated(true);
          navigate(`/test/${user}`);
          console.log(`/test/${user}`);
        }
      } else {
        console.error("Unexpected status:", response.status);
        // alert("Failed to login user. Check console for details.");
      }
    } catch (error) {
      console.error("Error logging user:", error);
      // alert("Failed to log user");
    } finally {
      setLoading(false);
    }
  };

  const changeUserInput = (e) => {
    setUser(e.target.value);
  };

  const changePasswordInput = (e) => {
    setPassword(e.target.value);
  };

  const createUser = (e) => {
    e.preventDefault();
    register(user, password);
  };

  const loginUser = (e) => {
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
          <button onClick={createUser} disabled={loading}>
            Register
          </button>
          <button onClick={loginUser} disabled={loading}>
            Login
          </button>
        </section>
      </div>
      {/* <Notes /> */}
    </>
  );
};

export default App;
