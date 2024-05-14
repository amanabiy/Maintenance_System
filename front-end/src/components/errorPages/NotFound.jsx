import React from "react";
import { Box, Typography, Container } from "@mui/material";
import GridParent from "../layout/GridParent";
import NotFoundImage from "../../assets/images/404Error.svg";
import "./index.scss";

const NotFound = () => (
  <GridParent className="not-authorized-container">
    <Box className="not-authorized-box">
      <img src={NotFoundImage} alt="Not Found" className="not-found-image" />
      <Typography variant="h5" className="error-message">
        Oops! Page not found.
      </Typography>
      <Typography variant="body2" className="error-description">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </Typography>
    </Box>
  </GridParent>
);

export default NotFound;
