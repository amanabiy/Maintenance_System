import React from "react";
import GridParent from "../layout/GridParent";
import SidebarButton from "./SidebarButton";
import GridItem from "../layout/GridItem";
import DashboardIcon from "@mui/icons-material/Dashboard";

//styles
import "./styles.scss";

const SidebarContainer = ({ buttons, sidebarOpen }) => {
  return (
    <div className={"sidebar"}>
      <div xs={12} className="top">
        <span className="logo">Maintainance System</span>
      </div>
      <div xs={12}>
        <hr />
      </div>
      <div xs={12} className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          <p className="title">LIST</p>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          <p className="title">USER</p>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
        </ul>
      </div>
      <div xs={12} className="bottom">
        <div className="colorOption"></div>
        <div className="colorOption"></div>
      </div>
    </div>
  );
};

export default SidebarContainer;
