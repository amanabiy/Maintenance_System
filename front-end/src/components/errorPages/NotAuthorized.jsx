import React from "react";
import { Box, Typography, Container } from "@mui/material";
import GridParent from "../layout/GridParent";
import NotAuthorizedImage from "../../assets/images/401Error.svg";
import "./index.scss";

const NotAuthorized = () => (
  <GridParent className="not-authorized-container">
    <Box className="not-authorized-box">
      <img
        src={NotAuthorizedImage}
        alt="Not Authorized"
        className="not-authorized-image"
      />
      <Typography variant="h5" className="error-message">
        You are Not Authorized to View This Page
      </Typography>
      <Typography variant="body1" className="error-description">
        Please check with your admin if you feel like this is a mistake.
      </Typography>
    </Box>
  </GridParent>
);

export default NotAuthorized;
