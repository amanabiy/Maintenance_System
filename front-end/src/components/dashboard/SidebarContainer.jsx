import React from "react";
import { NavLink, Navigate } from "react-router-dom";
import GridParent from "../layout/GridParent";
import SidebarButton from "./SidebarButton";
import GridItem from "../layout/GridItem";
import DashboardIcon from "@mui/icons-material/Dashboard";

//styles
import "./styles.scss";

const SidebarContainer = ({ buttons, sidebarOpen }) => {
  return (
    <div className={"sidebar"}>
      <div className="top">
        <span className="logo">Maintenance System</span>
      </div>
      <div>
        <hr />
      </div>
      <div className="center">
        <ul>
          {buttons && buttons.main && <p className="title">MAIN</p>}
          {buttons &&
            buttons.main &&
            buttons.main.map((button, index) => (
              <li key={index}>
                <NavLink to={`/active${button.path}`} className="nav-link">
                  <button.icon className="icon" />
                  <span>{button.text}</span>
                </NavLink>
              </li>
            ))}
          {buttons && buttons.list && <p className="title">LIST</p>}
          {buttons &&
            buttons.list &&
            buttons.list.map((button, index) => (
              <li key={index}>
                <NavLink to={`/active${button.path}`} className="nav-link">
                  <button.icon className="icon" />
                  <span>{button.text}</span>
                </NavLink>
              </li>
            ))}
          {buttons && buttons.usefull && <p className="title">USEFULL</p>}
          {buttons &&
            buttons.usefull &&
            buttons.usefull.map((button, index) => (
              <li key={index}>
                <NavLink to={`/active${button.path}`} className="nav-link">
                  <button.icon className="icon" />
                  <span>{button.text}</span>
                </NavLink>
              </li>
            ))}
          {buttons && buttons.user && <p className="title">USER</p>}
          {buttons &&
            buttons.user &&
            buttons.user.map((button, index) => (
              <li key={index}>
                <NavLink to={`/active${button.path}`} className="nav-link">
                  <button.icon className="icon" />
                  <span>{button.text}</span>
                </NavLink>
              </li>
            ))}
        </ul>
      </div>
      <div className="bottom">
        <div className="colorOption"></div>
        <div className="colorOption"></div>
      </div>
    </div>
  );
};

export default SidebarContainer;
