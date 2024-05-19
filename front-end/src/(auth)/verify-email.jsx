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
import VerifyImage from "../assets/images/verify-email.svg";
import { useParams } from "react-router-dom";
import { useVerifyEmailMutation } from "../redux/features/auth";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [verifyEmail, { isLoading, error }] = useVerifyEmailMutation();

  const handleSubmit = async () => {
    try {
      const res = await verifyEmail(token);
      if (res.data.message === "Email verified successfully") {
        navigate("/Login");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

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
          src={VerifyImage}
          alt="verify-email"
          style={{ width: "25%", height: "auto", margin: "30px" }}
        />
        <Typography
          variant="h4"
          style={{ textAlign: "center", fontSize: "30px", fontWeight: "550" }}
        >
          Verify your email address
        </Typography>
        <Typography
          variant="h4"
          style={{ textAlign: "center", fontSize: "15px", fontWeight: "250" }}
        >
          Please verify this email address by clicking button below
        </Typography>
      </GridItem>
      <GridItem
        xs={12}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          style={{
            backgroundColor: "#00CC9E",
            width: "20%",
            fontSize: "20px",
            borderRadius: "10px",
          }}
        >
          {isLoading ? (
            <>
              <CircularProgress
                size={24}
                style={{ color: "white", marginRight: 8 }}
              />
              Verifying...
            </>
          ) : (
            "Verify Your Email"
          )}
        </Button>
      </GridItem>
    </GridParent>
  );
};

export default VerifyEmail;
