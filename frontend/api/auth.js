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
export const postsRequest = (token) => {
  return axios.get(`${API}/posts`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};
export const getPost = (token, id) => {
  return axios.get(`${API}/posts/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};
export const createPost = (token, post) => {
  return axios.post(`${API}/posts`, post, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}
export const deletePost = (token, id) => {
  axios.delete(`${API}/posts/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
    validateStatus: function (status) {
      return (status >= 200 && status < 300) || (status === 403);
    },
  });
}