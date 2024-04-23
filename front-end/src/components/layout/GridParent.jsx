import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
// import Grid from "./Grid";

const gridParentStyle = {
  width: "unset",
};

export default function GridParent(props) {
  const { children, ...rest } = props;
  return (
    <Grid container sx={{ ...gridParentStyle }} {...rest}>
      {children}
    </Grid>
  );
}

GridParent.propTypes = {
  children: PropTypes.node,
};
