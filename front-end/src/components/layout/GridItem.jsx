import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
// import Grid from "./Grid";
const gridItemStyle = {
  // padding: "0 5px !important",
};

export default function GridItem(props) {
  const { children, ...rest } = props;
  return (
    <Grid item sx={{ ...gridItemStyle }} {...rest}>
      {children}
    </Grid>
  );
}

GridItem.propTypes = {
  children: PropTypes.node,
};
