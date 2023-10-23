import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
      token: null,
      user: null,
      invitations: [],
    },
    reducers: {
      login: (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
      },
      logout: (state) => {
        state.token = null;
        state.user = null;
      },
      addPost: (state, action) => {
        state.invitations.push(action.payload);
      },
    },
  });
  
  export const { login, logout, addPost } = userSlice.actions;
  
  export default userSlice.reducer;