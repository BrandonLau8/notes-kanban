import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  useEffect(() => {
    fetchUsers();
  }, []);

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const [showUserData, setShowUserData] = useState(false);

  const fetchUsers = async () => {
    const data = await fetch("http://localhost:3001/login/users");
    const users = await data.json();
    setUsers(users);
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

  const showUsers = () => {
    setShowUserData(true);
  }
  return (
    
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

      <section>
      <button onClick={showUsers}>Show</button>
        {showUserData && (
          <div>
            {users.map((user, index) => (
              <div key={index}>
                <p>{user.username}</p>
                <p>{user.password}</p>
              </div>
            ))}
          </div>
        )}
      </section>
      
    </div>
  );
};

export default Login;
