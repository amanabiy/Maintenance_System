import React from "react";
import { NavLink } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";

// styles
import "./styles.scss";
import LogoutButton from "./LogoutButton";
import PermissionChk from "../../hooks/PermissionChk";

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
          <span className="logo">SmartMaint</span>
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
                // <PermissionChk
                //   requiredPermissions={
                //     button.requiredPermissions ? button.requiredPermissions : []
                //   }
                // >
                <li key={index}>
                  <NavLink to={`/active${button.path}`} className="nav-link">
                    <button.icon className="icon" />
                    <span>{button.text}</span>
                  </NavLink>
                </li>
                // </PermissionChk>
              ))}
            {buttons && buttons.list && <p className="title">LIST</p>}
            {buttons &&
              buttons.list &&
              buttons.list.map((button, index) => (
                // <PermissionChk
                //   requiredPermissions={
                //     button.requiredPermissions ? button.requiredPermissions : []
                //   }
                // >
                <li key={index}>
                  <NavLink to={`/active${button.path}`} className="nav-link">
                    <button.icon className="icon" />
                    <span>{button.text}</span>
                  </NavLink>
                </li>
                // </PermissionChk>
              ))}
            {buttons && buttons.usefull && <p className="title">USEFULL</p>}
            {buttons &&
              buttons.usefull &&
              buttons.usefull.map((button, index) => (
                // <PermissionChk
                //   requiredPermissions={
                //     button.requiredPermissions ? button.requiredPermissions : []
                //   }
                // >
                <li key={index}>
                  <NavLink to={`/active${button.path}`} className="nav-link">
                    <button.icon className="icon" />
                    <span>{button.text}</span>
                  </NavLink>
                </li>
                // </PermissionChk>
              ))}
            {buttons && buttons.user && <p className="title">USER</p>}
            {buttons &&
              buttons.user &&
              buttons.user.map((button, index) => (
                // <PermissionChk
                //   requiredPermissions={
                //     button.requiredPermissions ? button.requiredPermissions : []
                //   }
                // >
                <li key={index}>
                  {button.onClick ? (
                    <div onClick={() => button.onClick()} className="nav-link">
                      <button.icon className="icon" />
                      <span>{button.text}</span>
                    </div>
                  ) : button.logout ? (
                    <LogoutButton />
                  ) : (
                    <NavLink to={`/active${button.path}`} className="nav-link">
                      <button.icon className="icon" />
                      <span>{button.text}</span>
                    </NavLink>
                  )}
                </li>
                // </PermissionChk> */}
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
