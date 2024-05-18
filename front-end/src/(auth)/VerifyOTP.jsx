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
import { useVerifyOtpMutation } from "../redux/features/auth";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const VerifyOTP = () => {
  const [otp, setOTP] = useState("");
  const [error, setError] = useState("");
  const [values, setValues] = useState(Array(6).fill(""));
  const [verifyOtp, { isLoading, err }] = useVerifyOtpMutation();
  const email = sessionStorage.getItem("email");
  const navigate = useNavigate();
  const handleOTPChange = (event) => {
    setOTP(event.target.value);
  };

  const handleVerifyOTP = async () => {
    try {
      const result = await verifyOtp({ email, otp: values.join("") }).unwrap();
      console.log("OTP Verification Successful", result);
      if (result.message === "OTP verified successfully") {
        sessionStorage.setItem("otp", values.join(""));
        navigate("/reset-password");
      }
    } catch (err) {
      console.error("OTP Verification Failed", err);
      setErrorMessage(err.data ? err.data.message : "Failed to send OTP");
    }
  };

  const handlePaste = (index, event) => {
    event.preventDefault();
    const pasteValue = event.clipboardData.getData("text");
    const newValues = [...values];
    newValues.splice(index, pasteValue.length);
    newValues.splice(index, 0, ...pasteValue.split(""));
    setValues(newValues);
    if (index < newValues.length - 1) {
      if (typeof window !== "undefined") {
        const nextInput = document.getElementById(
          `input-${index + pasteValue.length}`
        );
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };

  const handleChange = (index, event) => {
    const newValues = [...values];
    newValues[index] = event.target.value;
    setValues(newValues);

    if (index < values.length - 1 && event.target.value) {
      const nextInput = document.getElementById(`input-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  return (
    <Container
      style={{
        padding: 0,
        margin: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#24344B",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Box
        style={{
          width: "50%",
          padding: "20px",
          backgroundColor: "#24344B",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src="/verifyotp.svg"
          alt="login"
          style={{ width: "500px", height: "auto" }}
        />
      </Box>
      <Box
        style={{
          width: "50%",
          padding: "20px",
          backgroundColor: "#FFFFFF",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            width: "80%",
            marginLeft: "150px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <Typography
            style={{
              fontSize: "25px",
              textAlign: "center",
              fontWeight: 550,
              //   marginLeft: "150px",
            }}
          >
            CHECK YOUR EMAIL
          </Typography>
          <Typography
            style={{
              fontSize: "15px",
              textAlign: "center",
              fontWeight: 250,
              //   marginLeft: "150px",
            }}
          >
            We have sent a 4 digit verification code. Please enter the code
            below to verify account.
          </Typography>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              paddingLeft: 10,
              paddingRight: 10,
              width: "65%",
            }}
          >
            {values.map((value, index) => (
              <input
                key={index}
                id={`input-${index}`}
                type="text"
                style={{
                  border: "0.5px solid #ccc",
                  fontSize: "1.25rem", // equivalent to text-xl
                  textAlign: "center",
                  width: "50%", // equivalent to w-1/3
                  height: "2.5rem", // equivalent to h-10
                  outline: "none",
                  boxShadow: "none",
                  borderRadius: "0.5rem", // equivalent to rounded-lg
                  margin: "0.5rem", // equivalent to m-2
                }}
                value={value}
                maxLength={1}
                onChange={(event) => handleChange(index, event)}
                onPaste={(event) => handlePaste(index, event)}
              />
            ))}
          </div>
          <Button
            style={{
              color: "#24344B",
              outline: "none",
              boxShadow: "none",
              textTransform: "none",
              textAlign: "center",
              textDecoration: "underline",
            }}
          >
            Resend Code
          </Button>
          <Button
            variant="contained"
            onClick={handleVerifyOTP}
            style={{
              backgroundColor: "#24344B",
              width: "65%",
              borderRadius: "10px",
            }}
          >
            Verify Account
          </Button>
        </div>
      </Box>
    </Container>
  );
};

export default VerifyOTP;

{
  /*  */
}
