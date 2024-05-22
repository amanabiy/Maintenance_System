import React from "react";
import { TextField } from "@mui/material";
import "./styles.scss";

const ReusableTextInput = ({
  value,
  onChange,
  label,
  placeholder,
  multiline,
  disabled,
  onBlur,
}) => {
  return (
    <TextField
      className="reusable-text-input"
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      variant="outlined"
      fullWidth
      margin="normal"
      multiline={multiline}
      disabled={disabled}
      onBlur={onBlur}
    />
  );
};

export default ReusableTextInput;
