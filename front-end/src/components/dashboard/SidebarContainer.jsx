import React from "react";
import GridParent from "../layout/GridParent";
import SidebarButton from "./SidebarButton";
import GridItem from "../layout/GridItem";

const SidebarContainer = ({ buttons }) => {
  return (
    <GridParent
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <GridItem xs={12} style={{ height: "100px" }}></GridItem>
      {buttons &&
        buttons.map((button) => {
          return (
            <SidebarButton
              text={button.text}
              icon={button.icon}
              onClick={button.onClick}
            />
          );
        })}
    </GridParent>
  );
};

export default SidebarContainer;
