import { createSlice } from '@reduxjs/toolkit';

const setAuthTokenInCookie = (token) => {
  document.cookie = `authToken=${token}; path=/`;
};

const removeAuthTokenFromCookie = () => {
  document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
};

const initialState = {
  isAuthenticated: false,
  authToken: "",
  email: "",
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      console.log("the action", action);
      state.isAuthenticated = true;
      state.authToken = action.payload.result.accessToken;
      state.email = action.payload.result.user.email;
      console.log("the email", state.email);
      setAuthTokenInCookie(action.payload.result.accessToken);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.authToken = "";
      removeAuthTokenFromCookie();
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;
