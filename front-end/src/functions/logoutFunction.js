import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";

const logoutFunction = () => {
  const dispatch = useDispatch();
  dispatch(logout());
  window.location.reload();
  console.log("Log out");
  return null;
};

export default logoutFunction;
