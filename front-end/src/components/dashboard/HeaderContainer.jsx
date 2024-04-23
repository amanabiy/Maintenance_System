import React from "react";
import GridParent from "../layout/GridParent";
import SearchBarContainer from "../searchFilter/SearchBarContainer";
import GridItem from "../layout/GridItem";
import { Avatar } from "@mui/material";

const HeaderContainer = () => {
  return (
    <GridParent
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "5px",
      }}
    >
      <GridItem
        xs={8}
        sm={4}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
        }}
      >
        <SearchBarContainer size={"small"} />
      </GridItem>
      <GridItem
        xs={4}
        sm={8}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
        }}
      >
        <Avatar sx={{ width: 36, height: 36 }}></Avatar>
      </GridItem>
    </GridParent>
  );
};

export default HeaderContainer;
