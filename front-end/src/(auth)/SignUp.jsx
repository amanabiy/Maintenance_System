import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlinePassword } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
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
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useRegisterMutation } from "../redux/features/auth";
import CircularProgress from "@mui/material/CircularProgress";

const SignupForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [register, { isLoading, error }] = useRegisterMutation();
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const handleSubmit = async () => {
    if (!email || !fullName || !password) {
      setErrorMessage("All fields are required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Invalid email address.");
      return;
    }

    if (
      !email.endsWith("@aastustudent.edu.et") &&
      !email.endsWith("@aastu.edu.et")
    ) {
      setErrorMessage(
        "Please use an institutional email address ending with @aastustudent.edu.et or @aastu.edu.et"
      );
      return;
    }

    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage(
        "Passwords do not match. Please enter matching passwords."
      );
      return;
    }

    setErrorMessage("");
    try {
      const result = await register({ email, fullName, password }).unwrap();
      navigate("/check-your-email");
    } catch (err) {
      setErrorMessage(err.data ? err.data.message : "Failed to register");
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrorMessage("");
  };

  const handleNameChange = (e) => {
    setFullName(e.target.value);
    setErrorMessage("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrorMessage("");
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setErrorMessage("");
  };

  const handleToggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleToggleConfirmVisibility = () => {
    setIsConfirmVisible(!isConfirmVisible);
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
          src="/signup.svg"
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
              marginLeft: "150px",
            }}
          >
            SIGN UP
          </Typography>
          <Grid
            container
            spacing={1}
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
                }}
              >
                <InputLabel htmlFor="name" style={{ fontSize: "12px" }}>
                  <FaUser style={{ fontSize: "16px", marginRight: "10px" }} />
                  Full Name
                </InputLabel>
                <OutlinedInput
                  id="name"
                  name="name"
                  type="text"
                  value={fullName}
                  onChange={handleNameChange}
                  label="Full Name"
                  style={{
                    height: "40px",
                    width: "100%",
                    textAlign: "center",
                    borderRadius: "10px",
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl
                fullWidth
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
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
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor="password" style={{ fontSize: "12px" }}>
                  <MdOutlinePassword
                    style={{ fontSize: "16px", marginRight: "10px" }}
                  />
                  Password
                </InputLabel>
                <OutlinedInput
                  id="password"
                  name="password"
                  type={isVisible ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleToggleVisibility}
                        edge="end"
                        style={{
                          fontSize: "1rem",
                          outline: "none",
                          boxShadow: "none",
                        }}
                      >
                        {isVisible ? (
                          <Visibility
                            style={{ fontSize: "1rem", outline: "none" }}
                          />
                        ) : (
                          <VisibilityOff
                            style={{ fontSize: "1rem", outline: "none" }}
                          />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                  style={{
                    height: "40px",
                    textAlign: "center",
                    borderRadius: "10px",
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel
                  htmlFor="confirm_password"
                  style={{ fontSize: "12px" }}
                >
                  <RiLockPasswordLine
                    style={{ fontSize: "16px", marginRight: "10px" }}
                  />
                  Confirm Password
                </InputLabel>
                <OutlinedInput
                  id="confirm_password"
                  name="confirm_password"
                  type={isConfirmVisible ? "text" : "password"}
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleToggleConfirmVisibility}
                        edge="end"
                        style={{
                          fontSize: "1rem",
                          outline: "none",
                          boxShadow: "none",
                        }}
                      >
                        {isConfirmVisible ? (
                          <Visibility
                            style={{ fontSize: "1rem", outline: "none" }}
                          />
                        ) : (
                          <VisibilityOff
                            style={{ fontSize: "1rem", outline: "none" }}
                          />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Confirm Password"
                  style={{
                    height: "40px",
                    textAlign: "center",
                    borderRadius: "10px",
                  }}
                />
              </FormControl>
              {errorMessage && (
                <FormHelperText error>{errorMessage}</FormHelperText>
              )}
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                style={{ backgroundColor: "#24344B" }}
              >
                {isLoading ? (
                  <>
                    <CircularProgress
                      size={24}
                      style={{ color: "white", marginRight: 8 }}
                    />
                    Processing...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="body2"
                style={{
                  fontSize: "14px",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography style={{ padding: "2px" }}>
                  Already have an account?
                </Typography>
                <Button
                  style={{
                    color: "#24344B",
                    outline: "none",
                    boxShadow: "none",
                    textTransform: "none",
                    fontSize: "14px",
                  }}
                  onClick={() => navigate("/login")}
                >
                  Log in
                </Button>
              </Typography>
            </Grid>
          </Grid>
        </FormControl>
      </Box>
    </Container>
  );
};

export default SignupForm;
