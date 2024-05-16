import { Button } from "@mui/material";
import React from "react";
import GridItem from "../layout/GridItem";
import "./styles.scss";

const SidebarButton = ({ onClick, icon, text }) => {
  return (
    <GridItem style={{ width: "100%" }}>
      <div className="custom-button" onClick={onClick}>
        <div className="icon">{icon}</div>
        <div className="text">{text}</div>
      </div>
    </GridItem>
  );
};

export default SidebarButton;
