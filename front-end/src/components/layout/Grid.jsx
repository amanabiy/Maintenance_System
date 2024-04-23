import React from "react";
import { Grid as MuiGrid } from "@mui/material";

const Grid = (props) => {
  // const breakpoints = {
  //   xs: 24,
  //   sm: 24,
  //   md: 24,
  //   lg: 24,
  //   xl: 24,
  // };

  return <MuiGrid {...props} container spacing={2} {...breakpoints} />;
};

export default Grid;
