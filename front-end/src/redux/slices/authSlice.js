import { createSlice } from "@reduxjs/toolkit";
import authApi from "../services/authApi";

const setAuthTokenInCookie = (token) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + 2 * 60 * 60 * 1000); // 2 hours expiry
  document.cookie = `authToken=${token}; path=/; expires=${expires.toUTCString()}; secure; samesite=strict`;
};
const setRefreshTokenInCookie = (token) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days expiry
  document.cookie = `refreshToken=${token}; path=/; expires=${expires.toUTCString()}; secure; samesite=strict`;
};

const removeAuthTokenFromCookie = () => {
  document.cookie =
    "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  console.log("Log out");
};

const removeRefreshTokenFromCookie = () => {
  document.cookie =
    "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};

const setRoleInSession = async (role, roleId, permissions) => {
  localStorage.setItem("role", role);
  localStorage.setItem("roleId", roleId);
  const permissionsArray = [];
  permissions.forEach((permission) => {
    permissionsArray.push(permission.name);
  });
  localStorage.setItem("permissions", permissionsArray);
  window.location.reload(); //temp solution for being unable to access local storage in PermissionsProvider unless refreshed
};

const removeRoleFromSession = () => {
  localStorage.removeItem("role");
  localStorage.removeItem("roleId");
  localStorage.removeItem("permissions");
};

const initialState = {
  isAuthenticated: false,
  authToken: "",
  email: "",
  role: "",
  roleId: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      console.log(action.payload);
      state.isAuthenticated = true;
      state.authToken = action.payload.result.accessToken;
      state.email = action.payload.result.user.email;
      state.role = action.payload.result.user.role.roleName;
      state.roleId = action.payload.result.user.role.id;
      setAuthTokenInCookie(action.payload.result.accessToken);
      setRefreshTokenInCookie(action.payload.result.refreshToken);
      setRoleInSession(
        action.payload.result.user.role.roleName,
        action.payload.result.user.role.id,
        action.payload.result.user.role.permissions
      );
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.authToken = "";
      removeAuthTokenFromCookie();
      removeRoleFromSession();
      removeRefreshTokenFromCookie();
    },
    refreshTokenSuccess: (state, action) => {
      state.authToken = action.payload.accessToken;
      setAuthTokenInCookie(action.payload.accessToken);
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.refreshToken.matchFulfilled,
      (state, action) => {
        state.authToken = action.payload.accessToken;
        setAuthTokenInCookie(action.payload.accessToken);
      }
    );
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;
