import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";

const logoutFunction = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    dispatch(logout());
    navigate("/Login")
    console.log("Log out");
    return null;
  };

export default logoutFunction;