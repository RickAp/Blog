import axios from "axios";
const API = "http://localhost:4000/api";

export const registerRequest = (user) => axios.post(`${API}/register`, user);
export const loginRequest = (user) => axios.post(`${API}/login`, user);
export const profileRequest = (token) => {
    return axios.get(`${API}/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
};
export const changePassword = (newPassword) => axios.post(`${API}/changePassword`, newPassword);