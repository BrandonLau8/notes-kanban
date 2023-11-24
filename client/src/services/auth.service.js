import axios from "axios";

const API_URL = "http://localhost:3001/api/auth/";

const register = (username, email, password, roles) => {
  return axios
    .post(
      API_URL + "signup",
      {
        username,
        email,
        password,
        roles,
      }
    )
    .then((response) => console.log(response.data))
    .catch((error) => {
      console.error("Request failed:", error.message);
      console.error("Request details:", error.config);
    });
};

const login = (username, password) => {
  
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
        
      if (response.data.username) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
    
};

const logout = () => {
  localStorage.removeItem("user");
  return axios.post(API_URL + "signout").then((response) => {
    return response.data;
  });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
