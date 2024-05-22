import React, { useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlinePassword } from "react-icons/md";
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
import { useLoginMutation } from "../redux/features/auth";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/slices/authSlice";
import GridParent from "../components/layout/GridParent";
import GridItem from "../components/layout/GridItem";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useRequestVerificationEmailMutation } from "../redux/features/auth";


const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [login, { isLoading, error }] = useLoginMutation();
  const [requestVerificationEmail] = useRequestVerificationEmailMutation();

  const handleSubmit = async () => {
    if (!email || !password) {
      setErrorMessage("All fields are required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Invalid email address.");
      return;
    }

    setErrorMessage("");
    try {
      const result = await login({ email, password }).unwrap();
      if (result.user.isVerified) {
        navigate("/active");
        dispatch(loginSuccess({ result }));
      }
    } catch (err) {
      if (err.data.message === "Please verify your email address") {
        const res = await requestVerificationEmail(email);
        navigate("/check-your-email");
      }
      setErrorMessage(err.data ? err.data.message : "Failed to register");
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrorMessage("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrorMessage("");
  };

  const handleToggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <GridParent
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
      <GridItem
        xs={6}
        md={6}
        style={{
          // width: "50%",
          padding: "20px",
          backgroundColor: "#24344B",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "solid red 2px",
        }}
      >
        <img
          src="/login.svg"
          alt="login"
          style={{ width: "500px", height: "auto" }}
        />
      </GridItem>
      <GridItem
        xs={6}
        // md={6}
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
            LOGIN
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
                          outline: "none", // Remove outline
                          boxShadow: "none", // Remove any box shadow that might appear on focus
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
            {/* add a forget password? here */}
            <Grid item xs={12}>
              <Typography
                variant="body2"
                style={{
                  fontSize: "8px",
                  textAlign: "right",
                  // marginTop: "1px",
                }}
              >
                <Button
                  style={{
                    color: "#24344B",
                    outline: "none",
                    boxShadow: "none",
                    textTransform: "none",
                  }}
                  onClick={() => navigate("/forgot-password")}
                >
                  Forgot password?
                </Button>
              </Typography>
            </Grid>
            {errorMessage && (
              <FormHelperText error>{errorMessage}</FormHelperText>
            )}
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
                  "Login"
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
                  Don't have an account?
                </Typography>
                <Button
                  style={{
                    color: "#24344B",
                    outline: "none",
                    boxShadow: "none",
                    textTransform: "none",
                    fontSize: "14px",
                  }}
                  onClick={() => navigate("/")}
                >
                  Create an account
                </Button>
              </Typography>
            </Grid>
          </Grid>
        </FormControl>
      </GridItem>
    </GridParent>
  );
};

export default LoginForm;
