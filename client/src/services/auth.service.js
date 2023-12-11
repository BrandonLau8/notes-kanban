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

const login = async (username, password) => {
  return await axios
    .post(API_URL + "signin", {
      username,
      password,
    }, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then((response) => {
        
      if (response.data.username) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      if(response.data.accessToken) {
        const accessToken = response.data.accessToken;
        axios.defaults.headers.common['x-access-token'] = accessToken;
        localStorage.setItem('accessToken', accessToken);
      }
      return (response.data);
    });
    
};

const logout = () => {
  localStorage.removeItem("user");
  return axios.post(API_URL + "signout").then((response) => {
    return response.data;
  });
};

const getCurrentUser = () => {
  const userData = localStorage.getItem("user");
  return userData ? JSON.parse(userData) : null;
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
