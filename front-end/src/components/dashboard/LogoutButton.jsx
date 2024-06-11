// LogoutButton.jsx
import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
const LogoutIcon = React.lazy(() => import("@mui/icons-material/Logout"));

const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    window.location.reload();
    console.log("Logged out");
  };

  return (
    <div onClick={() => handleLogout()} className="nav-link">
      <LogoutIcon className="icon" />
      <span>{"Log Out"}</span>
    </div>
  );
};

export default LogoutButton;
