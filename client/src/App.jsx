import React, { useState, useEffect } from "react";
import axios from "axios";
import Notes from "./components/Notes";
import { Outlet, Link, useNavigate } from "react-router-dom";

const App = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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



  return (
    <>
      
      {/* <Notes /> */}
    </>
  );
};

export default App;
