import { createSlice } from "@reduxjs/toolkit";

const setAuthTokenInCookie = (token) => {
  document.cookie = `authToken=${token}; path=/`;
};

const removeAuthTokenFromCookie = () => {
  document.cookie =
    "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};

const setRoleInSession = (role) => {
  sessionStorage.setItem("role", role);
};

const removeRoleFromSession = () => {
  sessionStorage.removeItem("role");
};

const initialState = {
  isAuthenticated: false,
  authToken: "",
  email: "",
  role: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.authToken = action.payload.result.accessToken;
      state.email = action.payload.result.user.email;
      state.role = action.payload.result.user.role.roleName;
      setAuthTokenInCookie(action.payload.result.accessToken);
      setRoleInSession(action.payload.result.user.role.roleName);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.authToken = "";
      removeAuthTokenFromCookie();
      removeRoleFromSession();
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;
