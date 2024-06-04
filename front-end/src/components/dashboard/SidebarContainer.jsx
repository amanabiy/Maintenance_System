import React from "react";
import { NavLink } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";

// styles
import "./styles.scss";

const SidebarContainer = React.forwardRef(
  ({ buttons, sidebarOpen, sidebarType }, ref) => {
    // console.log(sidebarOpen, sidebarType);
    return (
      <div
        ref={ref}
        className={`sidebar ${
          sidebarType === "small-sidebar" && sidebarOpen
            ? "small-sidebar animate-sidebar-open"
            : sidebarType === "small-sidebar" && !sidebarOpen
            ? "small-sidebar animate-sidebar-close"
            : "large-sidebar"
        } `}
      >
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
                  {button.onClick ? (
                    <div onClick={button.onClick}>
                      <button.icon className="icon" />
                      <span>{button.text}</span>
                    </div>
                  ) : (
                    <NavLink to={`/active${button.path}`} className="nav-link">
                      <button.icon className="icon" />
                      <span>{button.text}</span>
                    </NavLink>
                  )}
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
  }
);

export default SidebarContainer;
