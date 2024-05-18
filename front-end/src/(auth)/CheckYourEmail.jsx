import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import GridItem from "../components/layout/GridItem";
import GridParent from "../components/layout/GridParent";
import CheckImage from "../assets/images/check-your-email.svg";
import { useParams } from "react-router-dom";

const CheckYourEmail = () => {
  const handleSubmit = () => {
    console.log("Email Sent");
  };
  const { token } = useParams();
  console.log("the acquired token", token);
  return (
    <GridParent style={{}}>
      <GridItem
        xs={12}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "auto",
          gap: "20px",
          margin: "30px",
        }}
      >
        <img
          src={CheckImage}
          alt="check-your-email"
          style={{ width: "30%", height: "auto", margin: "30px" }}
        />
        <Typography
          variant="h4"
          style={{ textAlign: "center", fontSize: "30px", fontWeight: "550" }}
        >
          Check Your Email Address
        </Typography>
        <Typography
          variant="h4"
          style={{ textAlign: "center", fontSize: "15px", fontWeight: "250" }}
        >
          We have sent a verification link to your email. Please click the link
          to verify your account.
        </Typography>
      </GridItem>
    </GridParent>
  );
};

export default CheckYourEmail;
