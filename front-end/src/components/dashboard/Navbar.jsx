import React from "react";

// icons
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { Avatar, IconButton } from "@mui/material";

const Navbar = ({ sidebarOpen, toggleSidebar }) => {
  return (
    <div className="navbar">
      <div className="wrapper">
        {!sidebarOpen && (
          <div className="left">
            <IconButton className="item" onClick={toggleSidebar}>
              <ListOutlinedIcon className="icon" />
            </IconButton>
          </div>
        )}
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon className="icon" />
        </div>
        <div className="items">
          <div className="item">
            <DarkModeOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div>
          <div className="item">
            <Avatar className="avatar" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
