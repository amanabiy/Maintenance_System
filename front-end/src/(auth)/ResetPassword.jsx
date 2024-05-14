import React, { useState } from "react";
import { MdOutlinePassword } from "react-icons/md";
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

const ResetPasswordForm = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
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
              marginLeft: "150px",
            }}
          >
            RESET PASSWORD
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
                  type={isVisible ? "text" : "password"}
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
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
                  label="Confirm Password"
                  style={{
                    height: "40px",
                    textAlign: "center",
                    borderRadius: "10px",
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                style={{ backgroundColor: "#24344B" }}
              >
                {/* Add loading state here */}
                Update Password
              </Button>
            </Grid>
          </Grid>
        </FormControl>
      </Box>
    </Container>
  );
};

export default ResetPasswordForm;