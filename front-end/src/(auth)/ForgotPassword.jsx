import React, { useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
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

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrorMessage("");
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
          src="/forgotpassword.svg"
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
        <FormControl fullWidth>
          <Typography
            style={{
              fontSize: "25px",
              textAlign: "center",
              fontWeight: 550,
              marginLeft: "200px",
            }}
          >
            FORGOT PASSWORD
          </Typography>
          {errorMessage && (
            <FormHelperText error>{errorMessage}</FormHelperText>
          )}
          <Grid
            container
            spacing={2}
            style={{
              marginTop: "2px",
              width: "75%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              marginLeft: "150px",
            }}
          >
            <Grid item xs={12}>
              <FormControl
                fullWidth
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",

                  // width: '100%',
                }}
              >
                <InputLabel htmlFor="email" style={{ fontSize: "12px" }}>
                  <MdOutlineEmail
                    style={{ fontSize: "16px", marginRight: "10px" }}
                  />
                  Your Email
                </InputLabel>
                <OutlinedInput
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  label="Your Email"
                  style={{
                    height: "40px",
                    width: "100%",
                    textAlign: "center",
                    borderRadius: "10px",
                  }}
                />
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                style={{ backgroundColor: "#24344B" }}
              >
                {/* Add loading state here */}
                Submit
              </Button>
            </Grid>
          </Grid>
        </FormControl>
      </Box>
    </Container>
  );
};

export default ForgotPasswordForm;